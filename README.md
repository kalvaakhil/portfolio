# Enterprise Personal Portfolio Application (Spring Boot + React)

A premium, SaaS-like personal portfolio web application designed for recruiters from Tier-1 product companies. Demonstrates full-stack software development competency, clean security frameworks, and resilient caching/observability.

---

## 🚀 Key Highlights
- **SaaS Analytics Dashboard**: Visualizes page navigations and file download telemetry logs in real time.
- **Privacy-First Tracking**: Hashes IP addresses dynamically (SHA-256) to maintain compliance (GDPR) while tracking unique visitor counts.
- **Resilient Caching Tier**: Uses Redis cache-aside logic with event-driven cache clearing. Automatically degrades to local concurrent maps if Redis is unreachable.
- **Asymmetric Edge Security**: Leverages JWTS (asymmetric signatures) to assert trust down internal microservices VPC networks, avoiding token request fanning.
- **Rich Document Engine**: Generates dynamically formatted PDFs and CSV spreadsheets directly from database records.
- **Confetti animations**: Dynamic frontend form validations with confetti feedback on successful submissions.

---

## 🛠 Tech Stack

### Backend
- **Java 21** & **Spring Boot 3.2.4**
- **Spring Security** (Stateless sessions, JWT Filter, BCrypt)
- **Spring Data JPA** (PostgreSQL runtime, H2 dev fallback)
- **Spring Cache** (Redis integration, local map fallback)
- **Spring Actuator** (Prometheus & Micrometer metrics telemetry)
- **Lombok** & **MapStruct**
- **Springdoc OpenAPI** (Swagger UI documentation)
- **JUnit 5** & **Mockito**

### Frontend
- **React 18** & **TypeScript** & **Vite**
- **Tailwind CSS v3** (Custom glassmorphism themes)
- **Framer Motion** (Subtle premium micro-animations)
- **Recharts** (Custom traffic and analytics visualizer)
- **React Markdown** (Syntax-highlighted markdown blogs)
- **Axios** (API mapping with JWT interceptors)

---

## 📂 Repository Layout
```text
portfolio/
├── backend/                 # Spring Boot application source
│   ├── src/main/java/       # Controller, Service, Model, DTO, Config packages
│   ├── src/main/resources/  # application.yml and sql seeds
│   └── pom.xml              # Maven dependencies compiler settings
└── frontend/                # React Vite frontend application source
    ├── src/components/      # Reusable UI elements (Navbar, Footer, SVGs)
    ├── src/pages/           # Page modules (Home, Projects, Skills, Admin Dashboard)
    ├── src/services/        # Axios api mapping client
    └── package.json         # NPM libraries
```

---

## ⚙️ Quick Start Local Build

### Prerequisites
- Java 21 JDK installed
- Node.js (v18+) installed
- Maven installed

### Step 1: Start Backend (Port 8080)
```bash
cd backend
# Override JAVA_HOME if necessary for Java 21 compiler
$env:JAVA_HOME="C:\\Users\\kalva\\.jdks\\ms-21.0.11"
mvn clean verify
mvn spring-boot:run
```
*Note: Starts using H2 database profile. Seeds the database automatically with Akhil's profile details and seeds default admin credentials (`admin` / `password123`).*

### Step 2: Start Frontend (Port 5173)
```bash
cd ../frontend
npm install
npm run build
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to explore. To access the secure dashboard, navigate to `http://localhost:5173/admin/login` and authenticate with:
- **Username**: `admin`
- **Password**: `password123`
