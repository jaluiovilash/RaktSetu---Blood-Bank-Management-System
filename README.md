# RaktSetu - Backend

This repository contains the backend for the **RaktSetu** project, a Blood Bank Management System designed to streamline blood donation processes, inventory management, and request handling for hospitals. The backend is built using Node.js, Express, and MongoDB.

## Features

- **Authentication**: Manage blood bank staff authentication.
- **Blood Bank Management**: Handle donor registrations, blood stock, and donation scheduling.
- **Hospital Requests**: Facilitate blood requests from hospitals and manage availability.
- **Emergency Notifications**: Send notifications to nearby donors during emergencies.

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT** for authentication
- **Twilio** for SMS notifications

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/raktsetu-backend.git
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of your project with the following variables:
   ```plaintext
   MONGO_URI=mongodb://127.0.0.1:27017/your_db_name
   JWT_SECRET=your_jwt_secret
   PORT=5000

   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

4. Start the server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

- **Login**
  - **POST** `/api/auth/login`
  - **Request Body:**
    ```json
    {
      "email": "staff@example.com",
      "password": "password123"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "your_jwt_token",
      "staff": {
        "_id": "staff_id",
        "name": "Staff Name",
        "email": "staff@example.com"
      }
    }
    ```

### Blood Bank Routes

- **Register Donor**
  - **POST** `/api/bloodbank/register`
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "bloodType": "O+",
      "phone": "1234567890"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Donor registered successfully",
      "donor": {
        "_id": "donor_id",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "bloodType": "O+",
        "phone": "1234567890"
      }
    }
    ```

- **Update Donor Information**
  - **PUT** `/api/bloodbank/donors/:id`
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "updated@example.com",
      "bloodType": "A+",
      "phone": "0987654321"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Donor information updated successfully",
      "donor": {
        "_id": "donor_id",
        "name": "John Doe",
        "email": "updated@example.com",
        "bloodType": "A+",
        "phone": "0987654321"
      }
    }
    ```

### Hospital Blood Requests

- **Request Blood**
  - **POST** `/api/hospitals/request`
  - **Request Body:**
    ```json
    {
      "hospitalName": "City Hospital",
      "bloodType": "O+",
      "units": 3
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Request submitted successfully",
      "request": {
        "_id": "request_id",
        "hospitalName": "City Hospital",
        "bloodType": "O+",
        "units": 3,
        "status": "Pending"
      }
    }
    ```

- **View Blood Requests**
  - **GET** `/api/hospitals/requests`
  - **Response:**
    ```json
    [
      {
        "_id": "request_id",
        "hospitalName": "City Hospital",
        "bloodType": "O+",
        "units": 3,
        "status": "Pending"
      },
      {
        "_id": "request_id2",
        "hospitalName": "State Hospital",
        "bloodType": "A-",
        "units": 2,
        "status": "Fulfilled"
      }
    ]
    ```

### Emergency Notifications

- **Send Emergency Notification**
  - **POST** `/api/notifications/emergency`
  - **Request Body:**
    ```json
    {
      "latitude": 23.0225,
      "longitude": 72.5714,
      "bloodType": "O+",
      "radius": 10
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Emergency notifications sent to nearby donors."
    }
    ```

## Testing with Postman

1. Import the API endpoints to Postman using the following JSON collection:
    ```json
    {
      "info": {
        "name": "RaktSetu API",
        "_postman_id": "uuid",
        "description": "Postman collection for RaktSetu Backend API",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
      },
      "item": [
        {
          "name": "Auth - Login",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n    \"email\": \"staff@example.com\",\n    \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/auth/login",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "auth", "login"]
            }
          }
        },
        {
          "name": "Blood Bank - Register Donor",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n    \"name\": \"John Doe\",\n    \"email\": \"johndoe@example.com\",\n    \"bloodType\": \"O+\",\n    \"phone\": \"1234567890\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/bloodbank/register",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "bloodbank", "register"]
            }
          }
        }
      ]
    }
    ```

## License

This project is licensed under the MIT License.