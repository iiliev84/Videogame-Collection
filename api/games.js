import express from "express";
const router = express.Router();
export default router;
import { getExercisesIncludingWorkout } from "#db/queries/exercises"

router.route("/").get(async (req, res) => {
  const exercises = await getExercisesIncludingWorkout();
  res.send(exercises);
});

