import Router from "express-promise-router";
import {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../controllers/exercise.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/exercise", isAuth, getExercises);

router.get("/exercise/:exe_id", isAuth, getExerciseById);

router.post("/exercise", isAuth, createExercise);

router.put("/exercise/:exe_id", isAuth, updateExercise);

router.delete("/exercise/:exe_id", isAuth, deleteExercise);

export default router;
