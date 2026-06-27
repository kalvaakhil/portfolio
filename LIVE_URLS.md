# Deployment Reference & Live Links

This document lists the deployment endpoints, Swagger UI documentation, and local ports configured for the personal portfolio application.

---

## ☁️ 1. Production Cloud Environments

| Application | Hosting Provider | Deployment Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **React Frontend** | Vercel | `https://akhil-kalva.vercel.app` | Main client portfolio portal |
| **Spring Boot API** | Railway | `https://portfolio-backend.up.railway.app` | Core backend logic & analytics API |
| **Neon SQL Database** | Neon.tech | `postgresql://...neon.tech/portfoliodb` | Persistent database logs cluster |
| **Upstash Redis** | Upstash | `redis://...upstash.io:6379` | Cache-aside Redis database |

---

## 📖 2. API Documentation & Observability

- **Interactive Swagger Documentation**: `https://portfolio-backend.up.railway.app/swagger-ui/index.html` (or `http://localhost:8080/swagger-ui/index.html` locally)
- **Actuator Health Telemetry**: `https://portfolio-backend.up.railway.app/actuator/health` (or `http://localhost:8080/actuator/health` locally)
- **Actuator Prometheus Metrics**: `https://portfolio-backend.up.railway.app/actuator/prometheus` (or `http://localhost:8080/actuator/prometheus` locally)

---

## 🖥 3. Local Development References

- **Vite React Dev Port**: `http://localhost:5173`
- **Spring Boot API Port**: `http://localhost:8080`
- **In-Memory H2 Console**: `http://localhost:8080/h2-console`
  - *JDBC URL*: `jdbc:h2:mem:portfoliodb`
  - *Username*: `sa`
  - *Password*: `password`
- **Default Admin Account**:
  - *Username*: `admin`
  - *Password*: `password123`
