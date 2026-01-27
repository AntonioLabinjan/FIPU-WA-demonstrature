const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { getCollection } = require("../db");
const { hashPassword, comparePassword } = require("../auth");

router.post(
  "/",
  [
    body("username")
      .isString()
      .isLength({ min: 3, max: 20 }),
    body("password")
      .isString()
      .isLength({ min: 8 })
      .matches(/^[a-zA-Z0-9]+$/),
    body("email")
      .isString()
      .isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { username, password, email } = req.body;

    try {
      const collection = getCollection("users");

      const existing = await collection.findOne({ username });
      if (existing)
        return res.status(409).json({ message: "Username već postoji" });

      const hashedPassword = await hashPassword(password, 10);

      const newUser = {
        username,
        password: hashedPassword,
        email,
      };

      const result = await collection.insertOne(newUser);

      res.status(201).json({
        _id: result.insertedId,
        username,
        email,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Greška na serveru" });
    }
  }
);


router.post(
  "/login",
  [
    body("username").isString().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;

    try {
      const collection = getCollection("users");

      const user = await collection.findOne({ username });
      if (!user)
        return res.status(404).json({ message: "Korisnik ne postoji" });

      const match = await comparePassword(password, user.password);
      if (!match)
        return res.status(401).json({ message: "Neispravna lozinka" });

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Greška na serveru" });
    }
  }
);

module.exports = router;