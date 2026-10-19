# 🎵 Spotify Clone Backend

🎧 A Node.js and Express REST API for a music streaming application. It supports user and artist accounts, cookie-based JWT authentication, music uploads through ImageKit, and album management backed by MongoDB.

## 🛠️ Tech stack

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![ImageKit](https://img.shields.io/badge/ImageKit-00A9E0?logo=imagekit&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- 👤 Register, log in, and log out users and artists
- 🔐 Hash passwords with `bcryptjs`
- 🍪 Issue JWTs in an HTTP cookie
- 🛡️ Restrict music and album actions by account role
- ☁️ Upload music files to ImageKit
- 🗄️ Store users, music, and albums in MongoDB

## 📋 Requirements

- 🟢 Node.js and npm
- 🍃 A MongoDB database (local or MongoDB Atlas)
- 🖼️ An ImageKit account and private API key for music uploads

## 🚀 Getting started

1. Install dependencies from this directory:

   ```bash
   npm install
   ```

2. Create a `.env` file in this directory with your own credentials:

   ```env
   MONGO_URI=mongodb://localhost:27017/Spotify_clone
   JWT_SECRET=replace-with-a-long-random-secret
   IMAGEKIT_PRIVATE_KEY=replace-with-your-imagekit-private-key
   ```

   Use your MongoDB connection string and ImageKit private key. Keep `.env` private; it is excluded from Git.

3. Start the API:

   ```bash
   npm start
   ```

   The server listens on `http://localhost:3000`. For development, run `npm run dev`.

## 🔌 API

All endpoints use the base URL `http://localhost:3000`. Authentication uses the `token` cookie returned by registration or login. Send JSON bodies with `Content-Type: application/json`, except for the music upload endpoint, which uses `multipart/form-data`.

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Create an account. Provide `username`, `email`, and `password`; `role` is optional and defaults to `user` (`artist` is also supported). |
| `POST` | `/api/auth/login` | Public | Log in with `username` or `email` and `password`. |
| `POST` | `/api/auth/logout` | Public | Clear the authentication cookie. |
| `POST` | `/api/music/artist` | Artist | Upload a track. Use multipart fields `title` and `music` (the file). |
| `POST` | `/api/music/album` | Artist | Create an album with a JSON body containing `title` and `music` (an array of music document IDs). |
| `GET` | `/api/music` | User | Get music. The current implementation returns at most two tracks. |
| `GET` | `/api/music/albums` | User | List albums. |
| `GET` | `/api/music/albums/:albumId` | User | Get an album and its music by album ID. |

Role-protected routes require the `token` cookie. Create an account with the matching role (`user` or `artist`) before calling those routes.

## 📁 Project structure

- `server.js` — loads environment variables, connects to MongoDB, and starts the server
- `src/app.js` — configures Express and mounts API routes
- `src/routes/` — authentication and music route definitions
- `src/controller/` — request handlers
- `src/middlewares/` — role-based JWT authorization
- `src/models/` — Mongoose schemas for users, music, and albums
- `src/services/` — ImageKit upload integration
- `src/db/` — MongoDB connection

