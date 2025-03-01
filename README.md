
# Next.js API with better-sqlite3 - User Management

This project demonstrates a simple CRUD (Create, Read, Update, Delete) API built with Next.js and `better-sqlite3` for managing user data. It provides endpoints to interact with a local SQLite database, allowing you to create, retrieve, update, and delete user records.

## Features

*   **CRUD Operations:**
    *   **Create:** Add new users to the database.
    *   **Read:** Retrieve single users by ID or all users.
    *   **Update:** Modify existing user information.
    *   **Delete:** Remove users from the database.
*   **`better-sqlite3`:** Uses the `better-sqlite3` library for efficient SQLite database interaction.
*   **Next.js API Routes:** Leverages Next.js API routes for clean and organized server-side logic.
*   **Error Handling:** Includes robust error handling for common issues like invalid input, missing IDs, and users not found.
*   **Clear Code Structure:** The code is well-structured and separated into API route handlers and database helper functions.
* **Type safety**: the project is fully type safe, and prevent many errors at compile time.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    #or
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    The API will be available at `http://localhost:3000/api/users` (or the port you specified in `.env.local`).

## API Endpoints

### GET /api/users

*   **Description:** Retrieves either all users or a single user by ID.
*   **Request:**
    *   **Get All Users:** `GET /api/users`
    *   **Get User by ID:** `GET /api/users?id=<user_id>` (e.g., `GET /api/users?id=5`)
*   **Response:**
    *   **Success (All Users):** Returns an array of user objects.
    ```json
    [
      { "id": 1, "name": "Alice", "email": "alice@example.com" },
      { "id": 2, "name": "Bob", "email": "bob@example.com" }
    ]
    ```
    *   **Success (Single User):** Returns a single user object.
    ```json
    { "id": 1, "name": "Alice", "email": "alice@example.com" }
    ```
    *   **Error (User Not Found):** Returns a 404 status code and an error message.
    ```json
    { "message": "User not found" }
    ```

### POST /api/users

*   **Description:** Creates a new user.
*   **Request:** `POST /api/users`
*   **Request Body (JSON):**
    ```json
    {
      "name": "New User",
      "email": "newuser@example.com"
    }
    ```
*   **Response:**
    *   **Success:** Returns a 201 status code and the ID of the newly created user.
    ```json
    { "id": 3 }
    ```
    *   **Error (Bad Request):** Returns a 400 status code and an error message if `name` or `email` are missing.
    ```json
    { "message": "Name and email are required" }
    ```

### PUT /api/users

*   **Description:** Updates an existing user.
*   **Request:** `PUT /api/users?id=<user_id>` (e.g., `PUT /api/users?id=1`)
*   **Request Body (JSON):**
    ```json
    {
      "name": "Updated Name",
      "email": "updated@example.com"
    }
    ```
*   **Response:**
    *   **Success:** Returns a 200 status code and a success message.
    ```json
    { "message": "User updated successfully" }
    ```
    *   **Error (Bad Request):** Returns a 400 status code if `id`, `name` or `email` are missing.
    ```json
    { "message": "Name and email are required" }
    ```
    *   **Error (User Not Found):** Returns a 404 status code if the user ID is not found.
    ```json
    { "message": "User not found" }
    ```

### DELETE /api/users

*   **Description:** Deletes an existing user.
*   **Request:** `DELETE /api/users?id=<user_id>` (e.g., `DELETE /api/users?id=2`)
*   **Response:**
    *   **Success:** Returns a 200 status code and a success message.
    ```json
    { "message": "User deleted successfully" }
    ```
    * **Error (Bad Request):** Returns a 400 status code if `id` is missing.
    ```json
    { "message": "id is required" }
    ```
    *   **Error (User Not Found):** Returns a 404 status code if the user ID is not found.
    ```json
    { "message": "User not found" }
    ```

## Project Structure

*   **`src/app/api/users/route.ts`:**  Handles the API route logic for user management.
*   **`lib/db.ts`:** Contains database initialization, helper functions (CRUD operations), and the `better-sqlite3` database instance.
*   **`database.db`**: Is the sqlite database generated on startup.

## Database

The project uses SQLite via the `better-sqlite3` library. The database file (`database.db`) is created in the root directory when the application starts.

## Dependencies

*   `next`: The React framework for server-side rendering and API routes.
*   `better-sqlite3`: A fast and simple SQLite3 library.

## Run in production

```bash
npm run build
npm start
