# Frontend Hiring App

## 👤 Candidate Information

- **Full Name:** Muhammad Riza
- **Email:** riza.riza69@gmail.com
- **Deployed URL:**
- **GitHub Repository:** https://github.com/rizariza69/job-portal

---

## 🚀 Project Overview

A Frontend Engineer Challenge built with **React + Vite + TailwindCSS** that simulates a hiring management portal with dual roles: **Admin** and **Applicant**.

---

## ⚙️ Tech Stack

- React 19 + Vite
- TailwindCSS 3.4
- React Router v7
- @mediapipe/tasks-vision (gesture capture)
- LocalStorage as mock database

---

## ✨ Key Features Implemented

- Dynamic job form rendering (required / optional / hidden)
- Form validation adapting to backend config
- Webcam capture using 3-finger gesture
- Admin job creation & candidate table
- Responsive and pixel-perfect UI

---

## 👥 Roles

### 🧑‍💼 Admin

- Login: `admin / admin123`
- Can create job, view job list, and see applicants.

### 👩‍💻 Applicant

- Login: `applicant / apply123`
- Can view jobs, apply with dynamic form, and capture profile picture.

---

## 💾 Data Storage

Uses **LocalStorage**:

- `jobs` — job postings
- `applications_<slug>` — job applicants
- `user` — current logged-in user

---

## 🧠 Gesture Capture

3-finger detection via **MediaPipe HandLandmarker** → auto photo capture.

---

## 🧪 Run Locally

```bash
npm install
npm run dev
```
