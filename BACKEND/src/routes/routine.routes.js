import Router from "express-promise-router";
import {
  getRoutines,
  getRoutineById,
  createRoutine,
  updateRoutine,
  deleteRoutine,
} from "../controllers/routine.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/routine", isAuth, getRoutines);

router.get("/routine/:rou_id", isAuth, getRoutineById);

router.post("/routine", isAuth, createRoutine);

router.put("/routine/:rou_id", isAuth, updateRoutine);

router.delete("/routine/:rou_id", isAuth, deleteRoutine);

export default router;    