from pydantic import BaseModel
from typing import Optional

class User_req (BaseModel):
    
    id_user : int 
    name : str
    matricula : Optional[str] = None 
    email : str
    password : str
    number : str
    role : str
    
class Suap_req (BaseModel):
    
    matricula : str 
    password : str
