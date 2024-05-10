# Bookworm API Documentation

## Introduction

Welcome to the documentation for the Bookworm API. This API provides endpoints for managing user accounts and book categories.

## Base URL

All API endpoints are relative to the following base URL:

### Base Url =` https://bookworm-backend-1.onrender.com`


## Authentication

The API uses Bearer Token authentication. You need to include a valid JWT token in the Authorization header for protected endpoints.

## Endpoints

### 1. Sign Up

- **Endpoint**: `/user/signup`
- **Method**: `POST`
- **Description**: `Create a new user account.`
- **Request Body**:
  ```json
  {
    "name": "Courage Nduka",
    "email": "couragenduka4.com",
    "passWord": "someone"
  }
2. Login
- **Endpoint**: `/user/login`
- **Method**: `POST`
- **Description**: `Log in to an existing user account.`
- **Request Body**:
  ```json
  {
  "email": "couragenduka4.com",
  "passWord": "someone"
  }
3. Google Authentication

- **Endpoint**: `/google`
- **Method**: `GET`
- **Description**: `Authenticate using Google.`

### 4. Find Email

- **Endpoint**: `/user/findEmail`
- **Method**: `POST`
- **Description**: `Find a user's email address.`
- **Request Body**:
  ```json
  {
    "email": "couragenduka4.com"
  }

5. Update Password
- **Endpoint**: `/user/updatePassword`
- **Method**: `POST`
- **Description**: `Update the password for a user.`
- **Request Body**:
  ```json
  {
    "passWord": "someone"
  }
### Authentication Required: Yes
6. Save Book Category
- **Endpoint**: `/createCategory`
- **Method**: `POST`
- **Description**: `Save a new book category.`
- **Request Body**:
  ```json
  {
  "name": "on wahala"
  }

