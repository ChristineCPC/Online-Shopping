import database
from fastapi import APIRouter

router = APIRouter();

@router.get("/categories")
def get_categories():
    connection = database.get_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT Category_Name FROM Category")
    categories = [row[0] for row in cursor.fetchall()]
    connection.close()
    return categories
