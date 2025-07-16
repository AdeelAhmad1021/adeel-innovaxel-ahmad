# 🔗 URL Shortener — Full Stack Project

This is a full-stack **URL Shortening Service** built as part of the Innovaxel ASE Assessment. The app allows users to generate short, shareable URLs for long links. It includes full CRUD operations and tracks usage statistics.

> ✅ Built with **React**, **Node.js**, **Express**, **MongoDB Atlas**, and **Bootstrap**

---

## 📁 Folder Structure

```bash
url-shortener/
├── backend/              # Express + MongoDB REST API
│   ├── app.js            # Main backend entry point
│   ├── routes/           # All Express route logic
│   ├── models/           # Mongoose models (URL schema)
│   └── .env              # MongoDB URI + port (not committed)
│
├── frontend/             # React frontend (Bootstrap UI)
│   ├── src/              # Main React code
│   └── public/           # Favicon, title, metadata
│
├── README.md             # 🔹 You are here
└── .gitignore            # Ignores node_modules, .env, etc.
```

---

## 🚀 Features

* ✅ Shorten long URLs using a 6-character code
* ✅ Track number of visits (`accessCount`)
* ✅ Update or delete any short URL
* ✅ View access statistics per short link
* ✅ Fully styled professional frontend (Bootstrap)
* ✅ All endpoints tested through React UI

---

## 📦 API Endpoints (All start with `/api`)

| Method | Endpoint                        | Description                    |
| ------ | ------------------------------- | ------------------------------ |
| POST   | `/api/shorten`                  | Create short URL               |
| GET    | `/api/shorten/:shortCode`       | Get original URL + count visit |
| PUT    | `/api/shorten/:shortCode`       | Update original long URL       |
| DELETE | `/api/shorten/:shortCode`       | Delete short URL               |
| GET    | `/api/shorten/:shortCode/stats` | Get usage stats (clicks, time) |

---

## 💻 Technologies Used

* **Frontend**: React, Axios, Bootstrap
* **Backend**: Node.js, Express, MongoDB Atlas, Mongoose
* **Other**: nanoid, dotenv, CORS

---

## 🔧 How to Run the Project Locally

### 🔎 Prerequisites

* Node.js & npm installed
* MongoDB Atlas account with a cluster created

---

### 📃 Step 1: Clone the Repository

```bash
git clone https://github.com/AdeelAhmad1021/adeel-innovaxel-ahmad.git
cd url-shortener
```

---

### 🔢 Step 2: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Start the server:

```bash
npm start
```

Server runs at: `http://localhost:5000/api`

---

### 🎨 Step 3: Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 📷 Screenshots

<details>
  <summary>Click to Expand</summary>

**Main UI Form**

<img width="356" height="415" alt="image" src="https://github.com/user-attachments/assets/2f11d76f-2b85-446d-ac14-3d94b87cc0b7" />


---

## 🤔 Improvements You Can Add

* Copy-to-clipboard button for short URLs
* Add loading indicators and spinners
* Frontend-side URL validation
* Redirect support via backend (`res.redirect(url)`) for real shortener behavior
* Hosting backend on Render, frontend on Vercel
* Use Helmet and Rate Limiting for security

---

## 🤎 Author

**Adeel Ahmad**
Full Stack Developer
[GitHub Profile](https://github.com/AdeelAhmad1021)

---

## ✅ Status

* ✅ 15+ meaningful commits
* ✅ All backend endpoints working and tested
* ✅ React frontend fully integrated
* ✅ Bootstrap-styled responsive UI
* ✅ Ready for review and submission to Innovaxel

---

> 🔧 Tip: Don't forget to replace your actual MongoDB URI and screenshots before publishing publicly!
