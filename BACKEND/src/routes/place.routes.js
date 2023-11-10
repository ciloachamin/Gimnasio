import Router from "express-promise-router";
import {
  createPlace,
  deletePlace,
  getPlaces,
  getPlace,
  updatePlace,
} from "../controllers/place.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/place", isAuth, getPlaces);

router.get("/place/:id", isAuth, getPlace);

router.post("/place", isAuth, createPlace);

router.put("/place/:id", isAuth, updatePlace);

router.delete("/place/:id", isAuth, deletePlace);

export default router;
