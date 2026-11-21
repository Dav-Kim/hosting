from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

users = []


@app.route("/auth/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON body"}), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400

    for user in users:
        if user["email"] == email:
            return jsonify({"error": "Email already exists"}), 409

    users.append(
        {
            "name": name,
            "email": email,
            "password": password,
        }
    )

    return jsonify({"message": "Signup successful"}), 201


@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "Invalid JSON body"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    for user in users:
        if user["email"] == email and user["password"] == password:
            return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "Invalid email or password"}), 401


if __name__ == "__main__":
    app.run(debug=True)
