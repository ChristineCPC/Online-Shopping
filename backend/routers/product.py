from fastapi import APIRouter, HTTPException, Depends
import mysql.connector
import database

router = APIRouter()

@router.get("/product")
def get_product():
    try:
        connection = database.get_connection()
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


@router.get("/product/{product_id}")
def get_product_by_id(product_id: int, db: mysql.connector.connection.MySQLConnection = Depends(database.get_connection)):
    try:
        
        cursor = db.cursor(dictionary=True)
        query = """
            SELECT 
                Product.Product_ID,
                Product.Name,
                Product.Description,
                Product.Price,
                Product_Image.Image_URL
            FROM Product
            LEFT JOIN Product_Image ON Product.Product_ID = Product_Image.Product_ID
            WHERE Product.Product_ID = %s
            LIMIT 1
        """
        cursor.execute(query, (product_id,))
        product = cursor.fetchone()

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        return product

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
