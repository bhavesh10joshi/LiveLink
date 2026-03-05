# 🔗 LiveLink (In Development)

**LiveLink** is a modern **real-time chat application** inspired by WhatsApp, built to provide fast, secure, and scalable communication.  
It supports **one-to-one messaging**, **dynamic group chats**, and **real-time updates** using WebSockets.

The project is actively evolving, with new features and optimizations being added continuously.

---

## 🚀 Features

### 🔹 User Features
- 🔐 Secure authentication (JWT + OAuth)
- 👤 Edit personal profile information
- 🖼️ Set and update profile images
- 🔍 Search users using **unique user IDs**
- ✉️ Send and receive chat invitations
- 💬 Real-time one-to-one messaging

### 🔹 Group Chat Features
- 👥 Create dynamic group chats
- ✏️ Edit group information (name, description, etc.)
- 🖼️ Set and update group profile images
- 💬 Real-time group messaging
- 🔄 Live updates for group changes

### 🔹 Real-Time Capabilities
- ⚡ Instant message delivery
- 🔄 Live UI updates without refresh
- 🌐 WebSocket-based communication

---
## 🚀 Images
<img width="1900" height="929" alt="image" src="https://github.com/user-attachments/assets/015e41b7-f05e-499a-90d5-b36fcc66aa24" />
<img width="1901" height="925" alt="image" src="https://github.com/user-attachments/assets/1762fcf5-a209-421a-95b4-be188bec5d8d" />
<img width="1919" height="926" alt="image" src="https://github.com/user-attachments/assets/34434aa0-542d-4b81-bbf2-cfd804d389fa" />
<img width="1912" height="925" alt="Screenshot 2026-02-18 204502" src="https://github.com/user-attachments/assets/113447fb-b2a7-4dfe-a575-1a9bfccab61e" />
<img width="1919" height="927" alt="image" src="https://github.com/user-attachments/assets/7bf16367-aab1-4563-8bfa-2e3c0850a1da" />
<img width="1919" height="922" alt="image" src="https://github.com/user-attachments/assets/7188690a-2f89-4f67-b392-300d77a682c2" />
<img width="1919" height="926" alt="image" src="https://github.com/user-attachments/assets/50f274df-5827-43d3-9f4e-9e887688fe56" />


## 🛠️ Tech Stack

### Frontend
- **React.js**
- **TypeScript**
- **Tailwind CSS**

### Backend
- **Node.js**
- **Express.js**
- **WebSockets**
- **MongoDB**
- **Mongoose**

### Authentication & Security
- **JSON Web Tokens (JWT)**
- **OAuth**
- **bcrypt** (password hashing)
- **Zod** (schema validation)

---

## 🧩 Architecture Overview

- **Client–Server architecture**
- REST APIs for authentication, user & group management
- WebSockets for real-time messaging
- MongoDB for scalable and flexible data storage
- Strong validation and security layers to prevent invalid or malicious data

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/your-username/LiveLink.git
cd LiveLink
```

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

### ⚙️ Environment Variables
Create a .env file in the backend directory:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OAUTH_CLIENT_ID=your_oauth_client_id
OAUTH_CLIENT_SECRET=your_oauth_client_secret
```

## 🛠️ Upcoming Features
- ✅ Message read receipts
- ✅ Typing indicators
- 📎 Media sharing (images, files)
- 🔔 Real-time notifications
- 🛡️ Advanced privacy & security controls
- 📱 Mobile-friendly UI enhancements

## 🤝 Contributing
Contributions are welcome!
If you’d like to improve LiveLink:

###1.Fork the repository
###2.Create a feature branch
###3.Commit your changes
###4.Open a Pull Request

## ⭐ Acknowledgements
###Inspired by real-world messaging platforms like WhatsApp, with a focus on scalability, performance, and clean architecture.

##📄 License
###  This project is licensed under the MIT License.
