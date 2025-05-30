import express from "express";
const router = express.Router();
export default router;
import { createPlatform, getPlatforms, getPlatform, deletePlatform, updatePlatform } from "#db/queries/platforms";

function isValidId(id) {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}

router.route("/").get(async (req, res) => {
    const platforms = await getPlatforms();
    res.send(platforms);
});
