from fastapi import FastAPI
from database import get_connection
from routers import product
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product.router)

@app.get("/test-db")
def test_db():
    conn = get_connection()
    if conn:
        return {"message": "Connected successfully!"}
    else:
        return {"message": "Failed to connect."}
