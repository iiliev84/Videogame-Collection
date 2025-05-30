import express from "express";
const router = express.Router();
export default router;
import { getWorkouts, getWorkoutByIdIncludingExercises } from "#db/queries/workouts";
import { createExercises } from "#db/queries/exercises";

router.route("/").get(async (req, res) => {
    const workouts = await getWorkouts();
    res.send(workouts);
});

router.route("/:id").get(async(req, res) => {
    res.send(req.workout);
});

router.param("id", async (req, res, next, id) => {
    const workout = await getWorkoutByIdIncludingExercises(id);
    if (!workout) 
        return res.status(404).send("Workout doesn't exist.");
    req.workout = workout;
    next();
});



router.route("/:id/exercises").post(async (req, res) => {
    if (!req.body) 
        return res.status(400).send("Request body is not provided.");

    const { name, size, sets, reps } = req.body;
    if (!name || !size || !sets || !reps)
        return res.status(400).send("Request body is missing required fields.");

    const exercise = await createExercises(name, sets, reps, req.workout.id);
    res.status(201).send(exercise);
});