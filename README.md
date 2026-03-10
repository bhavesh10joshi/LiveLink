# LiveLink 💬

LiveLink is a full-stack, real-time chat application inspired by WhatsApp. It features seamless user-to-user and group communication, real-time notifications, secure authentication, and media sharing. 

Designed with a modern UI and a robust backend, LiveLink provides a responsive and engaging messaging experience.

## ✨ Features

* **Real-Time Messaging:** Instant message delivery for both one-on-one and group chats.
* **Group Management:** Create groups, add or remove members, and manage group information.
* **Secure Authentication:** Email-based verification using OTPs (powered by Nodemailer) and secure password management.
* **Media Sharing:** Upload and share images within chats, integrated seamlessly with Cloudinary.
* **Live Notifications:** Stay updated with real-time alerts for new messages, group invites, and friend requests.
* **Responsive UI:** A beautiful, responsive frontend built with React, Vite, and Tailwind CSS.
* **Profile Customization:** Edit user profiles, manage friend lists, and update avatars.

## 🛠️ Tech Stack

**Frontend**
* React 19
* Vite (Bundler)
* TypeScript
* Tailwind CSS (Styling)
* React Router DOM (Navigation)
* Zod (Data Validation)
* Axios (API calls)
* Lottie React (Animations)

**Backend**
* Node.js & Express.js
* TypeScript
* Cloudinary (Image storage)
* Nodemailer (Email/OTP services)
* Zod (Schema validation)
* Database (Prisma/Mongoose configured in `src/db`)
* Express for routing and maintaining Api Endpoints .
* Websockets for realtime messaging !
* JWT(Json web token) for seemless token authorization !

##Architechture Diagram 
<img width="5676" height="3652" alt="diagram" src="https://github.com/user-attachments/assets/bd23ace8-5f87-4cee-9b52-81e238794a38" />

## 📂 Project Structure

The repository is organized into two main directories:

* `/frontend`: Contains the Vite + React client-side application.
* `/Backend`: Contains the Node.js server, API routes, database configuration, and third-party service integrations.

##Application Images
<img width="1919" height="925" alt="Screenshot 2026-03-10 150516" src="https://github.com/user-attachments/assets/90e274cd-69a0-446b-8fbd-a4b0a5cc89ac" />
<img width="1916" height="923" alt="Screenshot 2026-03-10 150530" src="https://github.com/user-attachments/assets/985b6255-f8e6-4f83-b72e-2804fb6c5cd8" />
<img width="1919" height="925" alt="Screenshot 2026-03-10 150543" src="https://github.com/user-attachments/assets/5cb326ae-cc23-470b-9f1b-cebf58e54a20" />
<img width="1918" height="927" alt="Screenshot 2026-03-10 150554" src="https://github.com/user-attachments/assets/dc4dcd7f-c9d7-47c3-a384-158c1696ab21" />
<img width="1918" height="929" alt="Screenshot 2026-03-10 150605" src="https://github.com/user-attachments/assets/b56e97ff-ccc8-4b5b-8fc0-e27d0323c65c" />
<img width="1917" height="929" alt="Screenshot 2026-03-10 150625" src="https://github.com/user-attachments/assets/60e5e00d-6e57-44e1-9366-31160f952b11" />
<img width="1918" height="926" alt="Screenshot 2026-03-10 151037" src="https://github.com/user-attachments/assets/26def448-bbb9-45d1-93c9-e5777b372fbd" />
<img width="1919" height="927" alt="Screenshot 2026-03-10 151115" src="https://github.com/user-attachments/assets/18f12418-6202-4fcd-b445-d42f7079b55d" />
<img width="1918" height="925" alt="Screenshot 2026-03-10 151147" src="https://github.com/user-attachments/assets/bd013763-b31f-44db-98ef-bbe829f910f3" />
<img width="1919" height="927" alt="Screenshot 2026-03-10 151157" src="https://github.com/user-attachments/assets/bf27b0a1-c1c7-4782-ad8e-da2fc784ebda" />
<img width="1916" height="924" alt="Screenshot 2026-03-10 151208" src="https://github.com/user-attachments/assets/82329498-aaeb-465c-a5f7-ab04c7050685" />
<img width="1918" height="925" alt="Screenshot 2026-03-10 151220" src="https://github.com/user-attachments/assets/b13bf4a9-785e-4a28-ba70-fefae30cdfbb" />
<img width="1919" height="926" alt="Screenshot 2026-03-10 151230" src="https://github.com/user-attachments/assets/1fe702a1-53c4-4e86-bd1d-9971781df2a7" />
<img width="1919" height="928" alt="Screenshot 2026-03-10 151250" src="https://github.com/user-attachments/assets/6df5b4ce-09de-47df-a1bc-6a8c2332a252" />
<img width="1919" height="929" alt="Screenshot 2026-03-10 151318" src="https://github.com/user-attachments/assets/0fb88ef2-06fd-4acb-b346-63a4596e40a4" />


## 🚀 Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites

* Node.js installed on your machine.
* A Cloudinary account for media storage.
* An email account to configure Nodemailer (e.g., Gmail App Passwords).
* A running database instance.

### 1. Clone the repository
```bash
git clone https://github.com/bhavesh10joshi/livelink.git
cd livelink
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory (refer to `.env.example` if available) and add your environment variables:
```env
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
```

Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The Backend in deployed on Render and Frontend is deployed on Vercel.
Working Link :- `https://live-link-phi.vercel.app/`

## 🌍 Deployment

* **Backend:** Successfully configured for deployment on platforms like Render. Ensure all environment variables are added to your hosting provider's dashboard.
* **Frontend:** Optimized for Vercel.
  * Framework Preset: Vite
  * Build Command: `npm run build`
  * Output Directory: `dist`
  * Install Command: `npm install`

## 👨‍💻 Author

**Bhavesh Joshi**
