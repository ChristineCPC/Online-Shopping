from fastapi import APIRouter
import mysql.connector
from database import get_connection

router = APIRouter()

@router.get("/orders")
def get_orders():
    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        query = """
        SELECT
            *
        FROM 
            Orders
        """
        cursor.execute(query)
        orders = cursor.fetchall()
        
        
        return orders
        
    except Exception as e:
        return {"error": str(e)}