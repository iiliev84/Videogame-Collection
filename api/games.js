import express from "express";
const router = express.Router();
export default router;
import { createGame, getGames, getGame, deleteGame, updateGame } from "#db/queries/games"

router.route("/").get(async (req, res) => {
  const games = await getGames();
  res.send(games);
});

