# Deployment Guide

This document outlines the deployment process for the Next.js storefront on Vercel and the optional Express backend on Render.

---

## 1. Vercel Deployment (Frontend)

The frontend is deployed on **Vercel Edge Network**:
- **Live URL:** [https://mithilla-makkhana.vercel.app/](https://mithilla-makkhana.vercel.app/)
- **Framework Preset:** Next.js
- **Node.js Version:** 18.x / 20.x

### Build Settings
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### Environment Variables on Vercel
Set these in **Project Settings** $\rightarrow$ **Environment Variables**:

| Variable | Value | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `https://codex1-nq28.onrender.com` | Live backend API URL |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | `415c9f2b-dffb-4cb5-9ed0-eb9b5e6da2a7` | Order dispatch key |

---

## 2. Render Deployment (Backend API)

The backend Express application is configured for deployment on **Render**:
- **Root Directory:** `backend`
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `node server.js`

### Configuration (`render.yaml`)
A root `render.yaml` specification defines the web service configuration:

```yaml
services:
  - type: web
    name: mithila-makhana-api
    env: node
    buildCommand: npm install
    startCommand: node server.js
    rootDir: backend
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
```

### CORS Configuration
Ensure `CORS_ORIGIN` in the backend environment matches the frontend URL:
```text
CORS_ORIGIN=https://mithilla-makkhana.vercel.app
```
