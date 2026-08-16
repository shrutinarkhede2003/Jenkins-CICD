const test = require("node:test");
const assert = require("node:assert");

test("Application basic test", () => {
    const message = "Jenkins CI/CD Pipeline is working!";

    assert.strictEqual(
        message,
        "Jenkins CI/CD Pipeline is working!"
    );
});