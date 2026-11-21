from psycopg2 import connect
from flask_sqlalchemy import SQLAlchemy

# from backend.app import login, signup

db = SQLAlchemy()

with connect(
    host="localhost",
    database="postgres",
    user="postgres",
    password="1234567890",
    
) as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM users;")
        users = cur.fetchall()
        print(users)

class user_data(db.model):

    def signup(user_data, id, username, email, password):
        __tablename__ = 'signup'

        id = db.Column(db.Integer, primary_key=True, unique=True)
        username = db.Column(db.String(50), unique=True, nullable=False)
        email = db.Column(db.String(100), unique=True, nullable=False)
        password = db.Column(db.String(100), nullable=False)

    def login(user_data, id, email, password):
        __tablename__ = 'login'

        id = db.Column(db.Integer, foreign_key=True, unique=True)
        email = db.Column(db.String(100), unique=True, nullable=False)
        password = db.Column(db.String(100), nullable=False)

# export: { user_data }