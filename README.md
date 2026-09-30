# Places Explorer

Full-stack demo: Google Places autocomplete + favorites, with JWT auth.

## Stack

**Backend**
- Java 17, Spring Boot 4.1.1
- Spring Security + JWT (jjwt)
- Spring Data JPA + Hibernate
- Flyway migrations
- MS SQL Server 2022
- Redis cache
- MapStruct, Lombok, Bucket4j, Resilience4j
- Actuator + Micrometer Tracing (Zipkin)

**Frontend**
- React 19, Redux Toolkit
- Tailwind CSS 3
- Axios
- @react-google-maps/api

**Infra**
- Docker Compose (MS SQL, Redis, Zipkin)

## Quick Start

```bash
# 1. Copy env template
cp .env.example .env
cp frontend/.env.example frontend/.env
# Fill in real values in both .env files

# 2. Start infrastructure
docker compose up -d

# 3. Backend
cd backend
./mvnw spring-boot:run

# 4. Frontend (new terminal)
cd frontend
npm install --legacy-peer-deps
npm start