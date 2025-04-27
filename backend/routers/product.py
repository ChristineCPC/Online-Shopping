from fastapi import APIRouter
import mysql.connector
from database import get_connection

router = APIRouter()

@router.get("/product")
def get_product():
    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        query = """
        SELECT
            Product.Product_ID,
            Product.Name,
            Product.Price,
            Product_Image.Image_URL
        FROM 
            Product
        INNER JOIN
            Product_Image ON Product.Product_ID = Product_Image.Product_ID
        WHERE
            Product_Image.Is_Primary_Image = "Y"
        """
        cursor.execute(query)
        product = cursor.fetchall()
        
        
        return product
        
    except Exception as e:
        return {"error": str(e)}