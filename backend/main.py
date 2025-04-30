from fastapi import FastAPI
from database import get_connection
from routers import product
from fastapi.middleware.cors import CORSMiddleware
from routers import login
from routers import search
from routers import categories
from routers import cart
from routers import checkout
from routers import orders


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product.router)
app.include_router(login.router)
app.include_router(search.search_router)
app.include_router(categories.router)
app.include_router(cart.router)
app.include_router(checkout.router)
app.include_router(orders.router)

@app.get("/test-db")
def test_db():
    conn = get_connection()
    if conn:
        return {"message": "Connected successfully!"}
    else:
        return {"message": "Failed to connect."}
