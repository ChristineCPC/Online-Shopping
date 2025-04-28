import os 
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

load_dotenv()


def get_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOSt"),
            port=int(os.getenv("DB_PORT")),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )
        return connection
    except Error as e:
        print("Error connecting to MySQL:", e)
        return None

def verify_user(email, password):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT User_Account.User_ID, User_Account.User_Role, User_Account.Customer_ID, Customer.Fname
        FROM User_Account
        JOIN Customer ON User_Account.Customer_ID = Customer.Customer_ID
        WHERE Email = %s AND Password = %s
    """
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    cursor.close()
    connection.close()

    return user
