import Router from "express-promise-router";
import {
  getPlaceByOwner,
  createPlacebyOwner,
  deletePlacebyOwner,
  searchMember,
  membershipState,
  attendanceMember,
  memberInfo,
} from "../controllers/admin.controllers.js";

import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {  attendanceSchema} from "../schemas/attendance.shema.js";


const router = Router();

router.get("/places/:owner_id", getPlaceByOwner);
router.post("/places/:owner_id", createPlacebyOwner);
router.delete("/places/:owner_id", deletePlacebyOwner);

router.get("/search/:place_id", searchMember);
router.get("/membership-state/:mem_id", membershipState);
router.get("/attendance-member/:mem_id", attendanceMember);

router.get("/member-info/:mem_id", memberInfo);



export default router;
