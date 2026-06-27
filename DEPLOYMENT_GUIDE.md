# Cloud Deployment & CI/CD Guide

This document details instructions to host the portfolio frontend, backend database, and Redis cache clusters on free cloud tiers.

---

## ☁️ 1. Hosting Services Architecture

- **Frontend Hosting**: **Vercel** (Static React TS bundle)
- **Backend Hosting**: **Railway** or **Render** (Dockerized Spring Boot container)
- **Primary Database**: **Neon PostgreSQL** (Serverless SQL cluster)
- **Cache Cluster**: **Upstash Redis** (Serverless caching)

---

## 🗄 2. Database & Cache Provisioning

### Neon PostgreSQL Setup
1. Sign up on [Neon.tech](https://neon.tech) and create a new project.
2. Select PostgreSQL 16/17 and name the database `portfoliodb`.
3. Copy the **Connection String** URL:
   `postgresql://[user]:[password]@[host]/portfoliodb?sslmode=require`

### Upstash Redis Setup
1. Sign up on [Upstash.com](https://upstash.com) and create a Redis database.
2. Select your target region and enable TLS.
3. Copy the **Redis URL**:
   `redis://:[password]@[host]:[port]`

---

## ⚙️ 3. Backend Deployment (Railway)

Railway automatically detects Dockerfiles and deploys containers.

1. Connect your GitHub repository to [Railway.app](https://railway.app).
2. Select the `backend` folder subpath.
3. Add the following **Environment Variables**:
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `SPRING_DATASOURCE_URL`: *[Your Neon Connection URL]*
   - `SPRING_DATASOURCE_USERNAME`: *[Neon DB User]*
   - `SPRING_DATASOURCE_PASSWORD`: *[Neon DB Password]*
   - `REDIS_URL`: *[Your Upstash Redis URL]*
   - `PORT`: `8080`
   - `EMAIL_NOTIFICATIONS_ENABLED`: `true` (if SMTP is configured)
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`: *(Optional SMTP credentials)*
4. Click **Deploy**. Copy the public deployment URL (e.g. `https://portfolio-backend-production.up.railway.app`).

---

## 🎨 4. Frontend Deployment (Vercel)

Vercel hosts compiled static React assets.

1. Sign up on [Vercel.com](https://vercel.com) and link your GitHub repository.
2. Configure build settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add **Environment Variables**:
   - `VITE_API_URL`: *[Your Railway Backend URL from Step 3, e.g. `https://portfolio-backend-production.up.railway.app/api`]*
4. Click **Deploy**.

---

## 🤖 5. GitHub Actions CI/CD Pipeline (Optional)

Create a workflow file `.github/workflows/deploy.yml` in your repo:

```yaml
name: Full-Stack CI/CD Build

on:
  push:
    branches: [ main ]

jobs:
  build-backend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up JDK 21
      uses: actions/setup-java@v3
      with:
        java-version: '21'
        distribution: 'microsoft'
        cache: maven
    - name: Build with Maven
      run: |
        cd backend
        mvn clean verify

  build-frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    - name: Install dependencies and build
      run: |
        cd frontend
        npm ci
        npm run build
```
This automated runner validates code compliance on every push to `main` branch.
