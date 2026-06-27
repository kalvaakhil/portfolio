# REST API Reference Documentation

This document describes all API endpoints exposed by the Spring Boot portfolio backend.

---

## 🔐 1. Authentication Controller

### Login
`POST /api/auth/login`
- **Description**: Authenticates user credentials and issues a JWT access token.
- **Access**: Public
- **Request Body**:
```json
{
  "username": "admin",
  "password": "password123"
}
```
- **Response (200 OK)**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsIn...",
  "tokenType": "Bearer",
  "username": "admin",
  "role": "ROLE_ADMIN"
}
```

---

## 📈 2. Analytics & Tracking Controller

### Track Page Visit
`POST /api/analytics/track`
- **Description**: Logs page view metrics (hashes IP addresses for privacy).
- **Access**: Public
- **Request Body**:
```json
{
  "pagePath": "/projects",
  "sessionId": "session_a8b9c2"
}
```
- **Response (200 OK)**: Empty

### Track Resume Download
`POST /api/downloads/track`
- **Description**: Tracks download counts.
- **Access**: Public
- **Request Body**:
```json
{
  "fileType": "PDF_RESUME"
}
```
- **Response (200 OK)**: Empty

### Fetch Analytics Summary
`GET /api/admin/analytics/summary`
- **Description**: Aggregates total views, downloads, unique IPs, and groups daily graphs.
- **Access**: Admin (JWT Required)
- **Response (200 OK)**:
```json
{
  "totalPageViews": 145,
  "uniqueVisitors": 34,
  "totalDownloads": 12,
  "totalMessages": 4,
  "pageViewsPerPath": {
    "/": 80,
    "/projects": 45
  },
  "viewsPerDay": [
    { "date": "2026-06-27", "views": 18 }
  ],
  "downloadsPerDay": [
    { "date": "2026-06-27", "downloads": 3 }
  ]
}
```

---

## 📝 3. Blogs Controller

### Fetch Blogs List
`GET /api/blogs`
- **Description**: Lists all blog posts sorted by creation date descending.
- **Access**: Public

### Fetch Blog Details
`GET /api/blogs/{id}`
- **Description**: Retrieves a single blog post and increments its view count.
- **Access**: Public

### Create Blog
`POST /api/admin/blogs`
- **Description**: Publishes a new markdown article.
- **Access**: Admin (JWT Required)

---

## 📧 4. Contact Controller

### Send Contact Message
`POST /api/contact`
- **Description**: Saves contact form message and dispatches email alert to Akhil.
- **Access**: Public
- **Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "System scaling help",
  "message": "Hello Akhil, I saw your microservice systems and..."
}
```
- **Response (201 Created)**: Saved Message entity.
