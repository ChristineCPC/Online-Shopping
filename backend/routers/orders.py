from fastapi import APIRouter, Depends
import database
import mysql.connector
from typing import List

router = APIRouter()

@router.get("/orders/{customer_id}")
async def order_history(customer_id: int):
    connection = database.get_connection()
    cursor = connection.cursor()

    # Get all orders for the customer
    cursor.execute("""
        SELECT Order_ID, Date_Placed, Sales_Total, Payment_Method, Order_Status
        FROM Orders
        WHERE Customer_ID = %s
        ORDER BY Date_Placed DESC
    """, (customer_id,))
    
    orders = cursor.fetchall()

    order_list = []

    for order in orders:
        order_id, date_placed, total, payment_method, status = order

        # Get items in this order
        cursor.execute("""
            SELECT p.Name, i.Quantity, i.Recorded_price, i.Item_Total
            FROM Item_In_Cart i
            JOIN Product p ON i.Product_ID = p.Product_ID
            WHERE i.Cart_ID = %s
        """, (order_id,))

        items = cursor.fetchall()
        item_list = [
            {
                "product_name": item[0],
                "quantity": item[1],
                "price_each": float(item[2]),
                "total": float(item[3])
            } for item in items
        ]

        order_list.append({
            "order_id": order_id,
            "date_placed": str(date_placed),
            "total": float(total),
            "payment_method": payment_method,
            "status": status,
            "items": item_list
        })

    cursor.close()
    connection.close()

    return {"orders": order_list}

@router.get("/orders/{order_id}/items")
def get_order_items(order_id: int, db: mysql.connector.connection.MySQLConnection = Depends(database.get_connection)):
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT p.Name, i.Quantity, i.Recorded_price, i.Item_Total
        FROM Item_In_Cart i
        JOIN Product p ON i.Product_ID = p.Product_ID
        WHERE i.Cart_ID = %s
    """, (order_id,))
    items = cursor.fetchall()
    cursor.close()
    return items