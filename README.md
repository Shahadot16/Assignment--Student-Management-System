<div align="center">

# 🎓 Student Management System

### A full-stack CRUD application for managing student records

Create, read, update and delete students through a clean, animated interface — powered by a REST API and a MongoDB database.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

</div>

---

## ✨ Features

- ➕ **Create** — add a new student through a validated form
- 📋 **Read** — view all students in a clean, responsive table
- ✏️ **Update** — edit any student's details inline
- 🗑️ **Delete** — remove a student with a confirmation prompt
- 🔔 **Toast notifications** for every action (success & errors)
- 🧩 **Form validation** — required fields + unique email enforcement
- 🎨 **Modern animated UI** — gradient theme, floating blobs, staggered row animations, colored avatars & skeleton loaders
- 📱 **Fully responsive** — works on mobile, tablet and desktop
- ♿ **Accessible** — respects `prefers-reduced-motion`

---

## 🗂️ Student Fields

Each student record contains:

| Field          | Description                      |
| -------------- | -------------------------------- |
| **Name**       | Full name of the student         |
| **Email**      | Unique email address             |
| **Phone**      | Contact number                   |
| **Department** | Academic department              |

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| **Framework**| Next.js 15 (App Router)             |
| **Frontend** | React 19, Tailwind CSS 3            |
| **Backend**  | Next.js API Routes (REST)           |
| **Database** | MongoDB                             |
| **ODM**      | Mongoose                            |
| **UX**       | react-hot-toast                     |

---

## 🔌 API Endpoints

| Method   | Endpoint             | Description            |
| -------- | -------------------- | ---------------------- |
| `GET`    | `/api/students`      | Get all students       |
| `POST`   | `/api/students`      | Create a new student   |
| `GET`    | `/api/students/:id`  | Get a single student   |
| `PUT`    | `/api/students/:id`  | Update a student       |
| `DELETE` | `/api/students/:id`  | Delete a student       |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── students/
│   │       ├── route.js          # GET (all) · POST (create)
│   │       └── [id]/route.js     # GET (one) · PUT (update) · DELETE
│   ├── layout.js                 # Root layout + toast provider
│   ├── page.js                   # Main UI & CRUD logic
│   └── globals.css               # Tailwind + custom animations
├── components/
│   ├── StudentForm.js            # Add / Edit form
│   └── StudentList.js            # Students table
├── lib/
│   └── mongodb.js                # Cached Mongoose connection
└── models/
    └── Student.js                # Mongoose schema & model
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Shahadot16/Assignment--Student-Management-System.git
cd Assignment--Student-Management-System
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database

Create a `.env.local` file in the root (you can copy `.env.example`) and add your MongoDB connection string:

```env
# Local MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/student_management

# — or — MongoDB Atlas (cloud)
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/student_management
```

> 💡 You need either a **local MongoDB** server running or a free **[MongoDB Atlas](https://www.mongodb.com/atlas)** cluster.

### 4. Run the development server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser 🚀

---

## 📜 Available Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Build for production             |
| `npm run start` | Start the production server      |
| `npm run lint`  | Run ESLint                       |

---

## 👤 Author

**Shahadot**  
GitHub: [@Shahadot16](https://github.com/Shahadot16)

---

<div align="center">

⭐ If you like this project, give it a star!

</div>
