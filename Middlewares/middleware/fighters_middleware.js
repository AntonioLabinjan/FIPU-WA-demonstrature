import { fighters } from "../fighters_data.js";

/* Middleware: pretraga borca po ID-u */
export const pretragaFightera = (req, res, next) => {
  const id = parseInt(req.params.id);
  const fighter = fighters.find(f => f.id === id);

  if (fighter) {
    req.fighter = fighter;
    return next();
  }

  return res.status(404).json({ message: "Fighter not found" });
};
