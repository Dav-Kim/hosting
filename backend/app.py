from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

API_URL = "https://hosting-0w8v.onrender.com"
users = []


@app.route("/auth/signup", methods=["POST"])
def signup():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "Invalid JSON body"}), 

    name = data.post("name")
    email = data.post("email")
    password = data.post("password")

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 

    for user in users:
        if user["email"] == email:
            return jsonify({"error": "Email already exists"}), 

    users.append(
        {
            "name": name,
            "email": email,
            "password": password,
        }
    )

    return jsonify(
        {
            "message": "Signup successful",
            },
        
    ), 


@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "Invalid JSON body"}), 

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}),

    for user in users:
        if user["email"] == email and user["password"] == password:
            return jsonify(
                {
                    "message": "Login successful",
                    }
                 ), 

    return jsonify({"error": "Invalid email or password"}),


if __name__ == "__main__":
    app.run(debug=True)