import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const users = []; // in-memory users

// =====================
// AUTH MIDDLEWARE
// =====================
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Nema tokena" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Nevažeći token" });
    }
}

// =====================
// SIGNUP
// =====================
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const exists = users.find(u => u.username === username);
    if (exists) {
        return res.status(400).json({ message: "Korisnik već postoji" });
    }

    const hashed = await bcrypt.hash(password, 10);

    users.push({
        id: users.length + 1,
        username,
        password: hashed
    });

    res.status(201).json({ message: "Registracija uspješna" });
});

// =====================
// LOGIN
// =====================
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: "Neuspješna prijava" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(401).json({ message: "Neuspješna prijava" });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

// =====================
// HOME (PROTECTED)
// =====================
app.get("/home", authMiddleware, (req, res) => {
    res.json({
        message: `Dobrodošao ${req.user.username}!`
    });
});

app.listen(process.env.PORT, () =>
    console.log(`Server radi na portu ${process.env.PORT}`)
);
