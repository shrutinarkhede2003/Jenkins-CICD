const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const startTime = Date.now();

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("🚀 Jenkins CI/CD Pipeline is working! Webhook test successful!");
});

// Health check route
app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        message: "Application is healthy",
        uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
        timestamp: new Date().toISOString()
    });
});

// System info route
app.get("/api/info", (req, res) => {
    res.json({
        name: "jenkins-cicd-app",
        version: "1.0.0",
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || "development",
        uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
        memoryUsage: process.memoryUsage()
    });
});

// 404 Route Handler
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `Route ${req.originalUrl} does not exist.`
    });
});

// Server listener and graceful shutdown
let server;
if (require.main === module) {
    server = app.listen(PORT, () => {
        console.log(`Application running on port ${PORT}`);
        console.log("Jenkins webhook test version");
    });

    const shutdown = (signal) => {
        console.log(`Received ${signal}. Shutting down gracefully...`);
        server.close(() => {
            console.log("HTTP server closed.");
            process.exit(0);
        });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
}

module.exports = app;