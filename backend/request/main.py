from fastapi import FastAPI, APIRouter
from api import request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI ()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Update this with your allowed origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(request.router)