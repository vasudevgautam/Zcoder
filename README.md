# ZCoder

ZCoder is a dynamic coding platform designed to help developers practice coding problems, share solutions, and receive feedback from the community. This application supports multiple programming languages and provides a feature-rich interface for coding enthusiasts.

## Features

- **Problem Statements**: Browse and solve a variety of coding problems.
- **Multi-Language Support**: Supports JavaScript, Python, Java, and C++.
- **User Solutions**: Submit and view solutions shared by other users.
- **Bookmarks**: Bookmark useful solutions for quick access.
- **Comments**: Engage with the community by commenting on solutions.
- **User Authentication**: Secure user registration and login using JWT.

## Tech Stack

- **Frontend**: React, Vite, CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)

## Project Structure

```text
ZCoder/
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
├── backend/
│   ├── Backend/
│   │   ├── server.js
│   │   └── ...
│   └── ...
├── .gitignore
├── package.json
└── README.md
```
## Getting Started
-**Prerequisites**

Make sure you have the following installed:

-**Node.js**
-**npm**
-**MongoDB**
## Clone the Repository
-**git clone https://github.com/vasudevgautam/Zcoder.git
cd Zcoder**
## Installation and Setup
## 1. Frontend Setup

Open the integrated terminal in the frontend directory:

-**npm install**
-**npm run dev**
## 2. Backend Setup

Open another integrated terminal and navigate to the backend directory:

-**cd backend/Backend**
-**npm install**
-**npm start**
## Environment Variables

-**The backend uses environment variables to store database configuration.**

-**Create a .env file in the backend directory:**

-**MONGO_URI=your_mongodb_connection_string**

-**Do not commit the .env file to GitHub.**

-**Make sure .env is included in .gitignore.**



