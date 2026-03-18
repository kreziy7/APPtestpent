# Student Notes Backend

## Setup
1.  Make sure you have PostgreSQL installed.
2.  Create a database named `student_notes`:
    ```sql
    CREATE DATABASE student_notes;
    ```
3.  Update the `.env` file with your PostgreSQL credentials if they differ from the defaults:
    - `DB_USER`
    - `DB_PASSWORD`
4.  Install dependencies:
    ```bash
    npm install
    ```
5.  Run the server:
    ```bash
    npm run dev
    ```

The server will automatically create the `notes` table if it doesn't exist.
The API will be available at `http://localhost:5000`.
