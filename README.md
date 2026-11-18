# JREDALED - Smart GSM Solar Street Light & RMS Management System (JREDA)
## PHP to Node.js + TypeScript + Next.js Migration

**Original Source Application:** `C:\Apache24\htdocs\JREDALED\old-code`  
**Client / Agency:** Jharkhand Renewable Energy Development Agency (JREDA) & GEIE  
**Target Technology Stack:**
- **Backend:** Node.js, TypeScript (strict mode), Express.js, Sequelize ORM, MySQL2, JWT authentication (HTTP-only cookies), bcryptjs + MD5 compatibility, Zod validation, Helmet, Rate Limiter, Multer file uploads.
- **Frontend:** Next.js 14, React 18, TypeScript, App Router, Bootstrap 4 / CodedThemes Theme CSS, Waves, FontAwesome, Themify Icons, Roboto Google Font.
- **Database:** MySQL 8 (`smartled_jreda2`), Docker Compose container.
- **Testing:** Jest, ts-jest, Supertest.

---

## 1. Quick Start Guide

### Step 1: Start MySQL Database
Using Docker Compose:
```bash
docker compose up -d
```
*Note: MySQL runs on port 3306 with database `smartled_jreda2` initialized via `backend/src/database/init.sql`.*

### Step 2: Run Backend
```bash
cd backend
npm run dev
```
Backend API and IoT Gateway will run at: `http://localhost:5000`

### Step 3: Run Frontend
```bash
cd frontend
npm run dev
```
Next.js App will run at: `http://localhost:3000`

---

## 2. Directory Structure

```
JREDALED/
├── old-code/               # Original PHP codebase preserved completely untouched
└── project/
    ├── backend/            # Express + TypeScript + Sequelize API
    ├── frontend/           # Next.js 14 + React 18 App Router
    ├── migration/          # Complete audit, inventory, route & DB mappings, checklists
    ├── screenshots/        # Visual comparisons
    ├── docker-compose.yml  # MySQL 8 service definition
    └── README.md
```
