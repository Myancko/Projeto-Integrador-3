from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.sqlalchemy_models.alchemy_mod import Base

         #postgresql://username:password@localhost:5432/database_name"
         
#DB_URL = "postgresql://postgres:postgres@localhost/test_6" 
DB_URL = "postgresql://postgres:root@localhost:5432/test_10" 

engine = create_engine(DB_URL)  

Base.metadata.create_all(engine)
SessionFactory = sessionmaker(autocommit=False, autoflush=False, bind=engine)