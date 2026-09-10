# Local Development Guide

This guide walks through setting up the Mithila Makhana storefront and backend for local development.

---

## 1. Prerequisites

- **Node.js**: v18.17.0 or later (Node 20+ recommended)
- **npm**: v9.0.0 or later
- **MongoDB**: (Optional) MongoDB Atlas connection URI or local instance for backend

---

## 2. Environment Variables

Create `.env.local` in the root directory:

```env
# Frontend API endpoint
NEXT_PUBLIC_API_URL=http://localhost:5000

# Web3Forms access key for test order emails
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=415c9f2b-dffb-4cb5-9ed0-eb9b5e6da2a7
```

*(Optional)* For the Express backend, create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mithila-makhana
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:3000
```

---

## 3. Installation & Running

### Frontend Development Server

```bash
npm install
npm run dev
```

The frontend will start at `http://localhost:3000`.

### Backend Server (Optional)

```bash
# In a separate terminal
npm run server:dev
```

The Express API will listen on `http://localhost:5000`.

---

## 4. Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server at `localhost:3000` |
| `npm run build` | Compiles the production build with type and lint checks |
| `npm run start` | Serves the optimized production build |
| `npm run server` | Runs the Express backend server (`backend/server.js`) |
| `npm run seed` | Seeds default products and mock data into MongoDB |
| `npm run dev:all` | Runs frontend and backend concurrently |

---

## 5. Admin Authentication & Management

To seed an admin user for dashboard testing:

```bash
node scripts/create-admin.js
```

Default credentials:
- **Email:** `admin@mithilamakhana.com`
- **Password:** `admin123`
- **Route:** `/admin-login` $\rightarrow$ `/admin/dashboard`
