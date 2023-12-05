import Router from "express-promise-router";
import {
  getPlaceByOwner,
} from "../controllers/admin.controllers.js";

import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {  attendanceSchema} from "../schemas/attendance.shema.js";


const router = Router();

router.get("/places/:owner_id", getPlaceByOwner);

export default router;
