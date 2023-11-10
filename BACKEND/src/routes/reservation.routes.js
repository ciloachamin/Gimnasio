import Router from "express-promise-router";
import {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservation.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/reservation", isAuth, getReservations);

router.get("/reservation/:res_id", isAuth, getReservationById);

router.post("/reservation", isAuth, createReservation);

router.put("/reservation/:res_id", isAuth, updateReservation);

router.delete("/reservation/:res_id", isAuth, deleteReservation);

export default router;
