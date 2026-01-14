import express from "express";
import { fighters } from "../fighters_data.js";
import { pretragaFightera } from "../middleware/fighters_middleware.js";
import { body, param, validationResult } from "express-validator";

const router = express.Router();

/* GET /fighters */
router.get("/", (req, res) => {
  return res.status(200).json(fighters);
});

/* GET /fighters/:id */
router.get(
  "/:id",
  param("id").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },
  pretragaFightera,
  (req, res) => {
    return res.status(200).json(req.fighter);
  }
);

/* POST /fighters */
router.post(
  "/",
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("age").isInt({ gt: 0 }),
  body("wins").isInt({ min: 0 }),
  body("losses").isInt({ min: 0 }),
  body("knockouts").isInt({ min: 0 }),
  body("country").notEmpty().isString(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const newFighter = {
      id: fighters.length + 1,
      ...req.body
    };

    fighters.push(newFighter);
    return res.status(201).json(newFighter);
  }
);

/* PATCH /fighters/:id */
router.patch(
  "/:id",
  param("id").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },
  pretragaFightera,
  (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No fields provided" });
    }

    Object.assign(req.fighter, req.body);
    return res.status(200).json(req.fighter);
  }
);

export default router;
