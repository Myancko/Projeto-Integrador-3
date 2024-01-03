from fastapi import FastAPI, APIRouter
from request.api import request
from user.api import user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI ()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your allowed origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print('aqui')

app.include_router(user.router)
app.include_router(request.router)