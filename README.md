# 🐒 Blog Monkey – Medium.com Fullstack Clone

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]()
[![Tech Stack](https://img.shields.io/badge/Tech-React%2C%20Vite%2C%20Hono%2C%20Prisma%2C%20Cloudflare%20Workers-blue)]()

A full-featured Medium.com clone built with a modern monorepo architecture. Includes a beautiful UI, robust backend, and seamless deployment to Cloudflare Workers.

---

## 🚀 Features

- 📝 Create, edit, and delete blog posts
- 👤 User authentication & profiles
- 💬 Commenting system
- 🏷️ Tagging & search
- 📊 Analytics dashboard
- 🌙 Dark mode support
- 📱 Responsive design

---

## 📸 Screenshots

![Signup Page](./assets/image.png?raw=true "Signup Page")

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Hono (Cloudflare Workers), Prisma
- **Database:** PostgreSQL (via Prisma)
- **Monorepo:** Shared types & logic in `common/`

---


## 🛠️ Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/rizwandev99/blog-monkey.git
   cd blog-monkey
   ```
2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. **Set up environment variables**
   - Copy `.env.example` to `.env` in both frontend and backend, and fill in your secrets.
4. **Run the app**
   - Frontend: `cd frontend && npm run dev`
   - Backend: `cd backend && npm run dev`

---

## 🤔 Why Blog Monkey?

- Modern monorepo structure
- Real-world fullstack patterns
- Cloudflare Workers deployment
- Clean, scalable codebase

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📬 Contact

- [Email](mailto:rizwandev99@gmail.com)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
