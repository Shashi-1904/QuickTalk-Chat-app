# QuickTalk - Real-Time Chat Application

QuickTalk is a full-stack chat application built using the **MERN stack** with real-time messaging functionality powered by **Socket.io**. It supports **one-on-one chats** as well as **group conversations**, ensuring a seamless and instant communication experience.

## Features

- 🔥 **Real-time messaging** using Socket.io
- 💬 **One-on-one and group chat support**
- 🔒 **Secure authentication and authorization**
- 📜 **Message history storage**
- 🖼 **Media sharing (images, files, etc.)**
- 🌙 **Dark mode support** (optional)
- 📱 **Responsive UI for mobile and desktop**

## Tech Stack

### Frontend
- React.js
- Redux (if used for state management)
- Tailwind CSS / Material-UI (for styling)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose (Database)
- Socket.io (Real-time communication)
- JWT Authentication

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/quicktalk.git
cd quicktalk
```

### 2. Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd frontend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

### 4. Run the Application
#### Start Backend Server
```sh
cd backend
npm run dev
```
#### Start Frontend Server
```sh
cd frontend
npm start
```

### 5. Access the App
Go to [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing
Feel free to fork the repo and create pull requests with improvements! 🚀

## License
This project is licensed under the MIT License.
