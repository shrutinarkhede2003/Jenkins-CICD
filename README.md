# Node.js Express Jenkins CI/CD Pipeline

A production-ready Node.js Express application equipped with automated unit & integration testing, Docker containerization, and a declarative Jenkins CI/CD pipeline.

---

## 🚀 Features

- **Express Web Application**: Lightweight REST API built with Node.js & Express.
- **System Monitoring**: Includes `/health` and `/api/info` endpoints for real-time uptime, memory, and environment diagnostics.
- **Automated Integration Testing**: Comprehensive test coverage using Node's native test runner (`node:test`) and assertions.
- **Code Quality & Linting**: Built-in syntax and code quality checks (`npm run lint`).
- **Containerized Deployment**: Multi-stage Docker setup hardened with non-root execution (`USER node`) and built-in container health checks.
- **Jenkins CI/CD Pipeline**: Declarative pipeline automation handling code checkout, linting, testing, Docker image creation, and automated container deployment.

---

## 📁 Repository Structure

```
Jenkins-CICD/
├── app.js             # Main Express application server
├── app.test.js        # Integration test suite (node:test)
├── Dockerfile         # Docker container configuration & healthcheck
├── Jenkinsfile        # Jenkins declarative CI/CD pipeline
├── package.json       # Project dependencies and npm scripts
└── README.md          # Project documentation
```

---

## 🛠️ Prerequisites

- **Node.js**: v18+ (Node 22 recommended)
- **Docker Desktop**: Installed and running locally
- **Jenkins**: Configured with Git and Pipeline plugins

---

## ⚙️ Local Development & Quickstart

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Syntax & Code Checks**:
   ```bash
   npm run lint
   ```

3. **Run Unit & Integration Tests**:
   ```bash
   npm test
   ```

4. **Start the Application Server**:
   ```bash
   npm start
   ```
   The application will run on `http://localhost:3000`.

---

## 📡 API Endpoints

### 1. `GET /`
- **Description**: Primary welcome message.
- **Response Status**: `200 OK`
- **Body**: `"🚀 Jenkins CI/CD Pipeline is working! Webhook test successful!"`

### 2. `GET /health`
- **Description**: Application health check used by load balancers and Docker `HEALTHCHECK`.
- **Response Status**: `200 OK`
- **Response Payload**:
  ```json
  {
    "status": "UP",
    "message": "Application is healthy",
    "uptimeSeconds": 42,
    "timestamp": "2026-08-17T18:45:00.000Z"
  }
  ```

### 3. `GET /api/info`
- **Description**: System and runtime metrics endpoint.
- **Response Status**: `200 OK`
- **Response Payload**:
  ```json
  {
    "name": "jenkins-cicd-app",
    "version": "1.0.0",
    "nodeVersion": "v22.x.x",
    "environment": "development",
    "uptimeSeconds": 42,
    "memoryUsage": { ... }
  }
  ```

---

## 🐳 Docker Usage

### Build Image
```bash
docker build -t jenkins-cicd-app .
```

### Run Container
```bash
docker run -d -p 3000:3000 --name jenkins-cicd-container jenkins-cicd-app
```

### Verify Container Health
```bash
docker ps
```

---

## 🔄 Jenkins CI/CD Pipeline Stages

The `Jenkinsfile` automates the end-to-end integration and deployment lifecycle:

1. **Checkout**: Pulls the latest commit from the SCM repository.
2. **Install Dependencies**: Runs `npm ci` for clean dependency installation.
3. **Lint & Code Check**: Validates JavaScript syntax (`npm run lint`).
4. **Test**: Executes automated test suite (`npm test`).
5. **Docker Build**: Packages application into a Docker container (`jenkins-cicd-app`).
6. **Deploy Container**: Stops existing container instance (if any) and starts a new container instance exposed on port 3000.
7. **Post Actions**: Reports build status and cleans up environment artifacts.
