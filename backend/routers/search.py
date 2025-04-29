from fastapi import APIRouter, HTTPException, Query
import database
from fastapi import FastAPI, Request
from typing import Optional, List
import mysql.connector
from fastapi.responses import JSONResponse

search_router = APIRouter()

@search_router.get("/search")
def search_products(q: str = Query(..., min_length=1), category: Optional[str]=None, color: Optional[str]=None):
    connection = database.get_connection()
    cursor = connection.cursor(dictionary=True)

    qry_search_products = """
        SELECT p.Product_ID, p.Name, p.Price, pi.Image_URL
        FROM Product p
        LEFT JOIN Product_Image pi ON p.Product_ID = pi.Product_ID AND pi.Is_Primary_Image = "Y"
        WHERE p.Name LIKE %s
    """

    params = [f"%{q}%"]

    if category:
        qry_search_products += " AND p.Category = %s"
        params.append(category)
    
    if color:
        qry_search_products += """
        AND EXISTS (
            SELECT 1 FROM Color_Variant cv
            WHERE cv.Product_ID = p.Product_ID AND cv.Color = %s
        )
        """
        params.append(color)

    try:
        cursor.execute(qry_search_products, params)
        product = cursor.fetchall()
        return product
    except Exception as e:
        print("Error searching products:", e)
        raise JSONResponse({"error": str(e)},status_code=500)
    finally:
        cursor.close()
        connection.close()

@search_router.get("/colors")
def get_available_colors(q: str = Query(..., min_length=1), category: Optional[str] = None):
    connection = database.get_connection()
    cursor = connection.cursor()

    qry_colors = """
        SELECT DISTINCT cv.Color
        FROM Color_Variant cv
        JOIN Product p ON cv.Product_ID = p.Product_ID
        WHERE p.Name LIKE %s
    """
    
    params = [f"%{q}%"]

    if category:
        qry_colors += " AND p.Category = %s"
        params.append(category)

    try:
        cursor.execute(qry_colors, params)
        colors = [row[0] for row in cursor.fetchall()]
        return colors
    except Exception as e:
        print("Error fetching available colors:", e)
        raise HTTPException(status_code=500, detail="Internal server error")
    finally:
        cursor.close()
        connection.close()
