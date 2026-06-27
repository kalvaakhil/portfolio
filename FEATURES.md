# Website Core Features Catalog

This document describes the interactive features implemented inside the portfolio application.

---

## 💻 1. Client-Facing Public Experience

### Animated Hero Section (Home)
- **Typing Subheader**: Infinite character typing cycle highlighting target backend and microservices roles.
- **Dynamic Counters**: Showcases core experience years, major projects, and educational GPA metrics.

### System Design Playbook (System Design)
- **Technical Blueprints**: Detailed flow explanations covering API Edge gateways, Kafka topics, and Cache eviction patterns.
- **Actuator Telemetry Monitor**: Visual JSON mockup explaining Spring health Actuator endpoints.

### Digital Trackable CV (Resume)
- **Print stylesheet**: Custom media print definitions hiding navbar headers and buttons, formatting a clean printable resume layout.
- **Trackable Downloads**: The "Download PDF" call registers analytics stats in the background database log.

### Interactive Career Journey (Experience)
- **Interactive Timeline**: Vertical timeline mapping Akhil's work experience history, duties, and technical stacks.
- **Accolades display**: Showcases AWS/OCP certifications and academic hackathon achievements.

### Sub-Millisecond Project Spec Exploration (Projects)
- **Interactive Tabbed Layout**: Detail tabs showing Overview, System Architecture, Sequence Flow, DB Design, and Troubleshooting cases for E-Commerce, FinFlow, and AI Job Search platforms.

### Dynamic Markdown Blog (Blog)
- **Search filter**: Instant, client-side indexing matching keywords, categories, or tags.
- **Markdown Interpreter**: Renders headers, lists, code boxes, and quotes using standard markdown structures.

---

## 🔒 2. Administrative Operations Console

### Secure Gatekeeper Login
- **JWT authorization**: Authenticates admin using Spring Security and locks all subsequent updates behind JWT headers.

### Live Telemetry Charts (Analytics)
- **Page Views Trend**: AreaChart mapping visitor page counts over the last 30 days.
- **Resume Downloads Trend**: BarChart mapping CV download hits.
- **Path allocation**: Horizontal BarChart showing page traffic distributions.

### Content management
- **Blogs publisher**: Dynamic editor supporting markdown formats, read times, categories, and comma-separated tag allocations.
- **User Messages Panel**: Inbox sorting inquiries, letting the admin mark mail as read or remove it from the backend.
