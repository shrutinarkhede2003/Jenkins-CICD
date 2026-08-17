const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const app = require("./app");

let server;
let baseUrl;

test.before(() => {
    return new Promise((resolve) => {
        server = http.createServer(app);
        server.listen(0, "127.0.0.1", () => {
            const address = server.address();
            baseUrl = `http://127.0.0.1:${address.port}`;
            resolve();
        });
    });
});

test.after(() => {
    return new Promise((resolve) => {
        if (server) {
            if (typeof server.closeAllConnections === "function") {
                server.closeAllConnections();
            }
            server.close(() => resolve());
        } else {
            resolve();
        }
    });
});

test("GET / - returns success message", async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.strictEqual(res.status, 200);
    const text = await res.text();
    assert.ok(text.includes("Jenkins CI/CD Pipeline is working!"));
});

test("GET /health - returns healthy status and uptime", async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, "UP");
    assert.strictEqual(data.message, "Application is healthy");
    assert.strictEqual(typeof data.uptimeSeconds, "number");
    assert.ok(data.timestamp);
});

test("GET /api/info - returns application system information", async () => {
    const res = await fetch(`${baseUrl}/api/info`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.name, "jenkins-cicd-app");
    assert.strictEqual(data.version, "1.0.0");
    assert.ok(data.nodeVersion);
    assert.ok(data.environment);
});

test("GET /non-existent - returns 404 error response", async () => {
    const res = await fetch(`${baseUrl}/non-existent-route`);
    assert.strictEqual(res.status, 404);
    const data = await res.json();
    assert.strictEqual(data.error, "Not Found");
    assert.ok(data.message.includes("/non-existent-route"));
});