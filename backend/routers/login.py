from fastapi import APIRouter, HTTPException, Depends, Form
from fastapi.security import OAuth2PasswordRequestForm
import database

router = APIRouter()

@router.post("/login")
def login_user(credentials: OAuth2PasswordRequestForm = Depends()):
    email = credentials.username
    password = credentials.password

    user = database.verify_user(email, password)

    if user:
        return {
            "message": f"Welcome, {user['Fname']}!",
            "user_id": user["User_ID"],
            "role": user["User_Role"],
            "customer_id": user["Customer_ID"]
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")
