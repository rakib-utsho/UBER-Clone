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

### 3. **User Profile Flow**

**Endpoint:** `GET /profile`  
**Authentication:** Required (JWT token)

**Flow:**
1. **Authentication Middleware**
   - Validates JWT token from cookies or Authorization header
   - Decodes user information
   - Attaches user object to request

2. **Controller Logic**
   - Returns authenticated user's profile data
   - No additional processing needed

### 4. **User Logout Flow**

**Endpoint:** `GET /logout`  
**Authentication:** Required (JWT token)

**Flow:**
1. **Authentication Middleware**
   - Validates JWT token

2. **Controller Logic**
   - Clears token cookie
   - Adds token to blacklist to prevent reuse
   - Returns success message

## 📬 Updated API Endpoints

| Method | Endpoint     | Description           | Auth Required |
|--------|--------------|-----------------------|---------------|
| POST   | /register    | Register a new user   | No           |
| POST   | /login       | Login with credentials| No           |
| GET    | /profile     | Get user profile      | Yes          |
| GET    | /logout      | Logout user           | Yes          |

## 🔐 Additional Security Features

- Token blacklisting prevents reuse of logged-out tokens
- Protected routes require valid JWT token
- Tokens are stored in HTTP-only cookies for XSS protection

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
```

### Profile Response
```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": "optional-socket-id"
}
```
