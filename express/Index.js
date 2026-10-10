
const express = require("express");
const server = express();
server.use(express.json());

function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function sumOfN(n) {
    return n * (n + 1) / 2;
}

function reverseString(str) {
    return [...str].reverse().join("");
}

function validN(n) {
    return Number.isSafeInteger(n) && n >= 0;
}

server.get("/factorial/:n", (req, res) => {
    const n = Number(req.params.n);

    if (!validN(n) || n > 170) {
        return res.status(400).json({ error: "Enter an integer from 0 to 170" });
    }

    res.json({ number: n, factorial: factorial(n) });
});

// GET 2: Sum of N numbers
server.get("/sum/:n", (req, res) => {
    const n = Number(req.params.n);

    if (!validN(n) || n > 134217727) {
        return res.status(400).json({ error: "Enter a valid non-negative integer" });
    }

    res.json({ number: n, sum: sumOfN(n) });
});

// GET 3: Reverse string
server.get("/reverse/:text", (req, res) => {
    const text = req.params.text;
    res.json({ original: text, reversed: reverseString(text) });
});

// POST 1: Factorial
server.post("/factorial", (req, res) => {
    const n = req.body?.n;

    if (!validN(n) || n > 170) {
        return res.status(400).json({ error: "Enter an integer from 0 to 170" });
    }

    res.json({ number: n, factorial: factorial(n) });
});

// POST 2: Sum of N numbers
server.post("/sum", (req, res) => {
    const n = req.body?.n;

    if (!validN(n) || n > 134217727) {
        return res.status(400).json({ error: "Enter a valid non-negative integer" });
    }

    res.json({ number: n, sum: sumOfN(n) });
});

// POST 3: Reverse string
server.post("/reverse", (req, res) => {
    const text = req.body?.text;

    if (typeof text !== "string") {
        return res.status(400).json({ error: "Enter text as a string" });
    }

    res.json({ original: text, reversed: reverseString(text) });
});

server.listen(4000, () => {
    console.log("Server started successfully at http://localhost:4000");
});
