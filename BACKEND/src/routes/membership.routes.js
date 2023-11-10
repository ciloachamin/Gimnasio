import Router from "express-promise-router";
import {
  getMemberships,
  getMembershipById,
  createMembership,
  updateMembership,
  deleteMembership,
} from "../controllers/membership.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/membership", isAuth, getMemberships);

router.get("/membership/:mbs_id", isAuth, getMembershipById);

router.post("/membership", isAuth, createMembership);

router.put("/membership/:mbs_id", isAuth, updateMembership);

router.delete("/membership/:mbs_id", isAuth, deleteMembership);

export default router;