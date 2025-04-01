

# CNNCT: 🗓️ Event Management & Meeting Scheduling Platform  

link--      https://event-app-pearl-iota.vercel.app/

## 🚀 Introduction  
This is a **full-stack** meeting scheduling platform that enables users to seamlessly **create, manage, and schedule meetings** with integrated authentication. Built using **Node.js, Express, MongoDB, and Vercel**, the platform ensures a smooth and efficient user experience.  


----


🧑‍💻 Demo Credentials

🔹 Login Credentials for Testing

Email: ravi@gmail.com  
Password: 123456  


Email: rahul@gmail.com  
Password: 123456  


Email: amaan@gmail.com  
Password: 1234567

Use these credentials to test the login functionality and explore the platform.

----



## ✨ Features  
✅ **User Authentication** (Signup, Login, Logout)  
✅ **Schedule Meetings** with specific participants  
✅ **Manage Meetings** (Update/Delete)  
✅ **Responsive UI** for seamless scheduling  
✅ **Secure API with JWT Authentication**  

---

## 🛠️ Tech Stack  
- **Backend:** Node.js, Express.js, MongoDB  
- **Frontend:** React (Hosted on Vercel)  
- **Authentication:** JWT & Cookies  
- **Deployment:** Vercel (Frontend) & Render (Backend)  

---

## 📌 Installation  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/Suzit05/meeting-scheduling-platform.git
cd meeting-scheduling-platform
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Set Up Environment Variables  
Create a `.env` file and add:  
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

### 4️⃣ Start the Server  
```bash
npm start
```

---

## 🔗 API Endpoints  

### **Authentication**  
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/logout` | Logout user |

### **Meetings**  
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/meeting/create` | Schedule a new meeting |
| GET | `/api/meeting/:id` | Get meeting details |
| PUT | `/api/meeting/:id` | Update a meeting |
| DELETE | `/api/meeting/:id` | Delete a meeting |

---

## 🌍 Deployment  
- **Frontend:** [Vercel Link]((https://event-app-pearl-iota.vercel.app/))  
- **Backend:** [Render API](https://event-app-9djv.onrender.com)  

---

## 💡 Future Improvements  
- 📆 **Google Calendar Integration**  
- 📩 **Email Notifications** for meeting invites  
- 📊 **Analytics Dashboard** for scheduled meetings  

---

## 🎯 Contributing  
Contributions are welcome! If you'd like to improve this project, follow these steps:  
1. Fork the repository 🍴  
2. Create a feature branch 🌱  
3. Commit your changes 📝  
4. Open a pull request 🚀  

---

## 📞 Contact  
**👤 Sujeet Kumar**  
📧 [sujeet05kp@gmail.com](mailto:sujeet05kp@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/sujeet05kp)  

---
