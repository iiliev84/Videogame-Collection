import express from "express";
const router = express.Router();
export default router;
import { createPlatform, getPlatforms, getPlatform, deletePlatform, updatePlatform } from "#db/queries/platforms";

router.route("/").get(async (req, res) => {
    const platforms = await getPlatforms();
    res.send(platforms);
});
