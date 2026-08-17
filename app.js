const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
    res.send("🚀 Jenkins CI/CD Pipeline is working! Webhook test successful!");
});

// Health check route
app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        message: "Application is healthy",
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
    console.log("Jenkins webhook test version");
});