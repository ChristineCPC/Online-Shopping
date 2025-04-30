from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
import database
from datetime import datetime

router = APIRouter()

@router.post("/checkout")
async def checkout(request: Request):
    data = await request.json()
    user_id = data.get("user_id")

    if not user_id:
        return JSONResponse(content={"error": "User ID is required"}, status_code=400)

    try:
        connection = database.get_connection()
        cursor = connection.cursor()
        connection.start_transaction()

        # Get the cart for this user
        cursor.execute("SELECT Cart_ID FROM Cart WHERE Customer_ID = %s", (user_id,))
        cart_result = cursor.fetchone()

        if not cart_result:
            return JSONResponse(content={"error": "Cart not found"}, status_code=404)

        cart_id = cart_result[0]

        # Get cart items
        cursor.execute("""
            SELECT Product_ID, Quantity, Recorded_Price, Item_Total
            FROM Item_In_Cart
            WHERE Cart_ID = %s
        """, (cart_id,))
        items = cursor.fetchall()

        if not items:
            return JSONResponse(content={"error": "Cart is empty"}, status_code=400)

        total_price = sum(item[3] for item in items)

        # Create new order
        cursor.execute("""
            INSERT INTO Order_ (Customer_ID, Date, Total)
            VALUES (%s, %s, %s)
        """, (user_id, datetime.now(), total_price))
        order_id = cursor.lastrowid

        # Move items to Item_In_Order
        for item in items:
            product_id, quantity, recorded_price, item_total = item
            cursor.execute("""
                INSERT INTO Item_In_Order (Product_ID, Order_ID, Quantity, Recorded_Price, Item_Total)
                VALUES (%s, %s, %s, %s, %s)
            """, (product_id, order_id, quantity, recorded_price, item_total))

        # Clear the cart - might change to where a new cart is created whenever a new order is started
        cursor.execute("DELETE FROM Item_In_Cart WHERE Cart_ID = %s", (cart_id,))

        connection.commit()

        return {"message": "Checkout successful", "order_id": order_id}

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=f"Checkout failed: {str(e)}")
    finally:
        cursor.close()
        connection.close()
