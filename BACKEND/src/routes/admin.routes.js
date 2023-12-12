import Router from "express-promise-router";
import {
  getPlaceByOwner,
  createPlacebyOwner,
  deletePlacebyOwner,
  searchMember,
} from "../controllers/admin.controllers.js";

import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {  attendanceSchema} from "../schemas/attendance.shema.js";


const router = Router();

router.get("/places/:owner_id", getPlaceByOwner);
router.post("/places/:owner_id", createPlacebyOwner);
router.delete("/places/:owner_id", deletePlacebyOwner);

router.get("/search/:place_id", searchMember);

export default router;
