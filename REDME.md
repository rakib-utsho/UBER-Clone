# User Authentication API

This project implements a basic user registration and login API using Node.js, Express, and MongoDB with Mongoose. It includes input validation, password hashing, and JWT-based authentication.

---

## 📁 Project Structure

├── models/
│ └── user.model.js
├── services/
│ └── user.service.js
├── controllers/
│ └── user.controller.js
├── routes/
│ └── user.routes.js



---

## 🧠 Logic and Data Flow

### 1. **User Registration Flow**

**Endpoint:** `POST /register`  
**Files Involved:**  
- `user.routes.js`
- `user.controller.js`
- `user.service.js`
- `user.model.js`

**Flow:**

1. **Validation (`user.routes.js`)**  
   - Validates that email is properly formatted.
   - Checks `fullname.firstName` has at least 3 characters.
   - Ensures password has at least 6 characters.

2. **Controller Logic (`user.controller.js`)**
   - Runs input validation.
   - Hashes the password using `userModel.hashPassword()`.
   - Calls `userService.createUser()` to store the user in MongoDB.
   - Generates JWT via `user.generateAuthToken()`.
   - Sends back token and user data.

3. **Service Layer (`user.service.js`)**  
   - Validates required fields.
   - Uses `userModel.create()` to save the user document.

4. **Model (`user.model.js`)**  
   - Schema contains `fullname`, `email`, `password`, `socketId`.
   - Password is excluded from queries by default.
   - Methods include:
     - `generateAuthToken()` using JWT.
     - `comparePassword()` using bcrypt.
     - `hashPassword()` using bcrypt.

---

### 2. **User Login Flow**

**Endpoint:** `POST /login`  
**Flow:**

1. **Validation (`user.routes.js`)**  
   - Validates email and password length.

2. **Controller Logic (`user.controller.js`)**
   - Validates inputs.
   - Finds user by email (`.select("+password")`).
   - Compares password using `user.comparePassword()`.
   - Generates and returns JWT token.

---

## 🔐 Security Highlights

- Passwords are hashed with bcrypt before storage.
- Password field is excluded by default in responses.
- JWT used for user authentication and session handling.

---

## 📬 API Endpoints

| Method | Endpoint     | Description           |
|--------|--------------|-----------------------|
| POST   | /register    | Register a new user   |
| POST   | /login       | Login with credentials|

---

## 🧪 Example Request (Register)

```json
POST /register
Content-Type: application/json

{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
