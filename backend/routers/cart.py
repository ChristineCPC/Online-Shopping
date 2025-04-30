from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
import database

router = APIRouter()

@router.post("/cart/add")
async def add_to_cart(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)

    if not all([user_id, product_id]):
        return JSONResponse(content={"error": "Missing data"}, status_code=400)

    connection = database.get_connection()
    cursor = connection.cursor()

    # STEP 1: Ensure active cart exists for user
    cursor.execute("SELECT Cart_ID FROM Cart WHERE User_ID = %s AND Status = 'active'", (user_id,))
    cart = cursor.fetchone()

    if cart:
        cart_id = cart[0]
    else:
        # Create new cart
        cursor.execute("INSERT INTO Cart (User_ID, Status) VALUES (%s, 'active')", (user_id,))
        connection.commit()
        cart_id = cursor.lastrowid

    # STEP 2: Get product price
    cursor.execute("SELECT Price FROM Product WHERE Product_ID = %s", (product_id,))
    product = cursor.fetchone()
    if not product:
        cursor.close()
        connection.close()
        return JSONResponse(content={"error": "Product not found"}, status_code=404)

    price = product[0]
    item_total = price * quantity

    # STEP 3: Check if product already in cart
    cursor.execute("""
        SELECT Quantity FROM Item_In_Cart WHERE Product_ID = %s AND Cart_ID = %s
    """, (product_id, cart_id))
    existing = cursor.fetchone()

    if existing:
        new_quantity = existing[0] + quantity
        new_total = price * new_quantity
        cursor.execute("""
            UPDATE Item_In_Cart 
            SET Quantity = %s, Item_Total = %s
            WHERE Product_ID = %s AND Cart_ID = %s
        """, (new_quantity, new_total, product_id, cart_id))
    else:
        cursor.execute("""
            INSERT INTO Item_In_Cart (Product_ID, Cart_ID, Quantity, Recorded_Price, Item_Total)
            VALUES (%s, %s, %s, %s, %s)
        """, (product_id, cart_id, quantity, price, item_total))

    connection.commit()
    cursor.close()
    connection.close()

    return {"message": "Item added to cart", "cart_id": cart_id}

@router.get("/cart/{cart_id}")
async def view_cart(cart_id: int):
    connection = database.get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT i.Item_In_Cart_ID, i.Product_ID, p.Name, i.Quantity, i.Recorded_Price, i.Item_Total
        FROM Item_In_Cart i
        JOIN Product p ON i.Product_ID = p.Product_ID
        WHERE i.Cart_ID = %s
    """, (cart_id,))

    items = cursor.fetchall()
    cursor.close()
    connection.close()

    return {"cart_items": [
        {
            "item_id": item[0],
            "product_id": item[1],
            "product_name": item[2],
            "quantity": item[3],
            "price": float(item[4]),
            "total": float(item[5])
        } for item in items
    ]}

@router.delete("/cart/{cart_id}/{item_id}")
async def remove_item_from_cart(cart_id: int, item_id: int):
    connection = database.get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        DELETE FROM Item_In_Cart
        WHERE Cart_ID = %s AND Item_In_Cart_ID = %s
    """, (cart_id, item_id))

    connection.commit()
    cursor.close()
    connection.close()

    return {"message": "Item removed from cart"}
