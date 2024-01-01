import sys
sys.path.append("..")

from fastapi import APIRouter, Depends, UploadFile, File, Form, Request, HTTPException
from fastapi.responses import JSONResponse, FileResponse

import datetime
import ntpath
from sqlalchemy import desc
from sqlalchemy.orm import Session
try:
    from db_config.sqlalchemy_config import SessionFactory
except:
    from ...db_config.sqlalchemy_config import SessionFactory
try:
    from ..models.request import Request_req
except:
    from models.request import Request_req
    
from request.repository.request import RequestRepository
from models.sqlalchemy_models.alchemy_mod import Request, User

import fitz #transforma pdf em img

import os


router = APIRouter(prefix="/request", tags=["Requests"])


def sess_db():
    db = SessionFactory()
    try:
        yield db
    finally:
        db.close()
        
@router.get("/list")
async def list_requests(sess: Session = Depends(sess_db)):
    repo: RequestRepository = RequestRepository(sess)
    result = repo.get_all_request()
    return result

      
@router.get("/get/last_id")
async def add_request(sess: Session = Depends(sess_db)):
    
    last_request = sess.query(Request).order_by(desc(Request.id_request)).first()
    if last_request:
        last_id = last_request.id_request
        return {'last_id':last_id}
    else:
        return {'last_id': 1}
    
@router.get("/list/users_request")
async def list_requests(owner_id : int, sess: Session = Depends(sess_db)):
    
    requests = sess.query(Request).filter(Request.owner == owner_id).all()

    return requests

@router.get("/get/{id}")
async def get_request(id: int, sess: Session = Depends(sess_db)):
    repo: RequestRepository = RequestRepository(sess)
    result = repo.get_request(id)
    return result

@router.get("/download/{id}")
async def get_request(id: int, sess: Session = Depends(sess_db)):
    repo: RequestRepository = RequestRepository(sess)
    result = repo.get_request(id)
    
    #file_path = "../"+result.data
    file_path = result.data
    file_name = ntpath.basename(file_path)
    return FileResponse(path=file_path, filename=file_name, media_type='')

@router.get("/file/img/{id}")
async def get_request(id: int, sess: Session = Depends(sess_db)):
    repo: RequestRepository = RequestRepository(sess)
    result = repo.get_request(id)
    
    try:
        full_path = result.data
        directory_path = os.path.dirname(full_path)
        file_path = f"{directory_path}/img.png"
        print(file_path, '<<<')
        file_extension = os.path.splitext(full_path)[1]
        
        print(file_extension, directory_path)

    except:
        raise HTTPException(status_code=404, detail="File not found")
    
    if file_extension == '.png' or file_extension == '.jpg' or file_extension == '.jpeg':
        
        return FileResponse(path=full_path)
    
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(path=file_path)

@router.post("/add")
async def add_request(req: Request_req = Depends(),
                      file: UploadFile = File(...),
                      sess: Session = Depends(sess_db)):
    
    print(req, '<<')
    #print('entrou')
    file_ext = file.filename.split('.').pop()
    f_name =  file.filename
    #print('.')
    owner_matricula = sess.query(User).filter(User.id_user == req.owner)
    
    
    if owner_matricula[0].matricula == None:
        
        #print('matricula None')
        owner = owner_matricula[0].email
        
    else:
    
        owner = owner_matricula[0].matricula
    
    last_request = sess.query(Request).order_by(desc(Request.id_request)).first()
    last_id = 0
    if last_request:
        last_id = last_request.id_request

    #print(owner)
    #input("<<<<")
    f_path = f"requests/{owner}/{last_id+1}/{f_name}"
    dir_path = os.path.dirname(f_path)
    
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)
    
    with open(f_path, 'wb') as f:
        content = await file.read()
        f.write(content)
    #print('ok <<<<<<')

    repo: RequestRepository = RequestRepository(sess)
    
    request = Request(id_request=last_id+1,
                  owner=req.owner,
                  data=f_path,
                  color=req.color,
                  reason=req.reason,
                  two_sided = req.two_sided,
                  status = req.status,
                  quantity=req.quantity,
                  date=datetime.date.today())
    
    result = repo.insert_request(request)
    
    ###  get file img
    
    file_name , file_extension = os.path.splitext(request.data)
    save_locaton = f"requests/{owner}/{last_id+1}/"
    
    if file_extension == ".pdf":
        
        pdf_document = fitz.open(request.data)
        page_index = 0
        
        page = pdf_document.load_page(page_index)


        image_list = page.get_pixmap()

        image_list.save(f"{save_locaton}img.png")
        
    elif file_extension == ".rtf":
        
        print('ainda n ;-;')
    
    #input('><><><><><>> stop') 
    
    if result == True:
        
        return request
    else:
        return JSONResponse(content={'message': 'create request problem encountered'}, status_code=500)
    
@router.delete("/delete/{id}")
async def delete_request(id: int, sess: Session = Depends(sess_db)):
    repo: RequestRepository = RequestRepository(sess)
    
    result = repo.delete_request(id)
    if result:
        return JSONResponse(content={'message': 'request deleted successfully'}, status_code=200)
    else:
        return JSONResponse(content={'message': 'delete request error'}, status_code=500)
    
@router.patch("/update/{id}")
def update_request(id: int, req: Request_req, sess: Session = Depends(sess_db)):
    
    request = req.dict(exclude_unset=True)
    repo: RequestRepository = RequestRepository(sess)
    result = repo.update_request(id, request)
    
    if result:
        return JSONResponse(content={'message': 'request updated successfully'}, status_code=201)
    else:
        return JSONResponse(content={'message': 'update request error'}, status_code=500)
    