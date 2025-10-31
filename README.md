# Shopverse

Shopverse — a starter fullstack multi-category e-commerce skeleton built with React (Vite) and Node.js/Express + MongoDB.

Quick start

1. Copy `.env.example` to `.env` and set your MongoDB URI and JWT secret.

2. From the project root, install dependencies and start both client and server:

```bash
npm install
npm run dev
```

Alternatively you can install in each folder:

```bash
npm install
cd server && npm install
cd ../client && npm install
```

Project layout

- `server/` — Express API (models, controllers, routes, middleware)
- `client/` — React (Vite) frontend (components, pages, context, utils, public/images)

Notes
- The server will read `MONGODB_URI` and `JWT_SECRET` from `.env`. A `.env.example` is provided.
- This is a starter scaffold. Implement payments, production config, and security hardening before deploying.
