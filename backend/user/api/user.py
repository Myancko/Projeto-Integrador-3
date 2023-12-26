import jwt
import json
from requests import Session as S
import security

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
from db_config.sqlalchemy_config import SessionFactory
from ..models.user import User_req, Suap_req
from ..repository.user import UserRepository
from models.sqlalchemy_models.alchemy_mod import User
from typing import List
from sqlalchemy import desc


JWT_SECRET = "gato_gordo"

router = APIRouter(prefix="/account", tags=["User"])


def sess_db():
    db = SessionFactory()
    try:
        yield db
    finally:
        db.close()
        
    
@router.get("/list")
async def list_accounts(sess: Session = Depends(sess_db)):
    repo: UserRepository = UserRepository(sess)
    result = repo.get_all_accounts()
    return result

@router.get("/get/last_id")
async def get_current_user(sess: Session = Depends(sess_db)):
    
    last_request = sess.query(User).order_by(desc(User.id_user)).first()
    
    print('last_request <<<<<<')
    if last_request:
        last_id = last_request.id_user
        return {'last_id':last_id}
    
    else:
        return {'last_id': 0}

@router.get("/get/{id}")
async def get_account(id: int, sess: Session = Depends(sess_db)):
    repo: UserRepository = UserRepository(sess)
    result = repo.get_account(id)
    return result


@router.post("/login/")
def login(matricula : str, password: str, sess: Session = Depends(sess_db)):
    repo: UserRepository = UserRepository(sess)

    owner_matricula = sess.query(User).filter(User.matricula == matricula)
    owner_email = sess.query(User).filter(User.email == matricula)
    #print(dir(owner_matricula), owner_matricula.count(),'<<<<<<<<')

    if owner_matricula.count() != 0:
        
        p = security.verify_password(password, owner_matricula[0].password)
        print(p, '>>>>>>>>>>>>>>>>>>>')
        
        if p == True:
            return owner_matricula[0]
        
        else:
            return False
    
    if owner_email.count() != 0:
        
        p = security.verify_password(password, owner_email[0].password)
        print(p, '>>>>>>>>>>>>>>>>>>>')
        
        if p == True:
            return owner_email[0]
        
        else:
            return False

    else:
        return False
   
oauth = OAuth2PasswordBearer(tokenUrl = 'account/token')
 
@router.post("/token")
async def token(form_data: OAuth2PasswordRequestForm = Depends(), sess: Session = Depends(sess_db)):
    
    user = login(form_data.username, form_data.password, sess)
    
    if not user:
        
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid matricula or password <"
        )
    
    else:
        print(user,  type(user), dir(user), '<<<<<<<<<')
        
        user_dict = {
    'id_user': user.id_user,
    'email': user.email,
    'matricula': user.matricula,
    'name': user.name,
    'number': user.number,
    'role': user.role,  
}

        token = jwt.encode(user_dict, JWT_SECRET)


        return {'access_token': token, "token_type": "bearer"}

@router.get("/me")
async def get_current_user(token : str = Depends(oauth), sess: Session = Depends(sess_db)):
    try:
    
        token_decode = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        print(token_decode['matricula'], '<<<<<')
        user = sess.query(User).filter(User.matricula == token_decode['matricula']).first()
    
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid matricula or password M"
            )
    
    return user


@router.post("/suap/add")
def create_account(req: Suap_req, sess: Session = Depends(sess_db)):
    repo: UserRepository = UserRepository(sess)


    dados = {'username': str(req.matricula),
             'password': str(req.password)}
    
    session = S()
    
    token = session.post('https://suap.ifrn.edu.br/api/v2/autenticacao/token/', json = {
        "username": req.matricula,
        "password": req.password
    })
    
    print(dir(token), token.text, '<<<')
    
    
    if token.status_code == 403:
        
        return RedirectResponse(url="https://suap.ifrn.edu.br/accounts/login/?next=/protected")
    
    token = json.loads(token.text)
    refresh = token['refresh']
    access = token['access']
    
    headers = {"Authorization": f"Bearer {access}"}
    
    user = session.get('https://suap.ifrn.edu.br/api/v2/minhas-informacoes/meus-dados/', headers=headers)
    
    user = json.loads(user.text)
    
    last_request = sess.query(User).order_by(desc(User.id_user)).first()
    last_id = 0
    if last_request:
        last_id = last_request.id_user
    
    create_user = User(id_user=last_id+1,
                  name=user['vinculo']['nome'],
                  matricula=user['matricula'],
                  email=user['email'],
                  password = security.get_password_hash(req.password),
                  number= 'None',
                  role=user['tipo_vinculo'])
    
    
    print('gerou')
    print(create_user)
    result = repo.insert_user(create_user)
    print('passou', result)
    if result == True:
        return create_user
    else:
        return JSONResponse(content={'message': 'create signup problem encountered, the email and the matrcula have to e different from an existing one'}, status_code=500)

    
    return JSONResponse(content={'message': f'{token.status_code},{token.text}'})   


@router.post("/add")
def create_account(req: User_req, sess: Session = Depends(sess_db)):
    
    repo: UserRepository = UserRepository(sess)
    last_request = sess.query(User).order_by(desc(User.id_user)).first()
    
    matricula = None
    last_id = 0
    
    if req.matricula:
        matricula = req.matricula
        
    if last_request:
        last_id = last_request.id_user

    signup = User(id_user=last_id+1,
                  name=req.name,
                  matricula=matricula,
                  email=req.email,
                  password = security.get_password_hash(req.password),
                  number=req.number,
                  role=req.role)
    
    
    result = repo.insert_user(signup)
    if result == True:
        return signup
    else:
        return JSONResponse(content={'message': 'create signup problem encountered, the email and the matricula have to e different from an existing one'}, status_code=500)


@router.delete("/delete/{id}")
async def delete_account(id: int, sess: Session = Depends(sess_db)):
    repo: UserRepository = UserRepository(sess)
    result = repo.delete_user(id)
    if result:
        return JSONResponse(content={'message': 'login deleted successfully'}, status_code=200)
    else:
        return JSONResponse(content={'message': 'delete login error'}, status_code=500)
   
@router.patch("/update/{id}")
def update_account(id: int, req: User_req, sess: Session = Depends(sess_db)):
    
    request = req.dict(exclude_unset=True)
    print(request, '<<<<')
    request['password'] = security.get_password_hash(request['password'])
    repo: UserRepository = UserRepository(sess)
    result = repo.update_user(id, request)
    
    if result:
        return JSONResponse(content={'message': 'profile updated successfully'}, status_code=201)
    else:
        return JSONResponse(content={'message': 'update profile error'}, status_code=500)