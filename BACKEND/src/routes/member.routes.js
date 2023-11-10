import Router from "express-promise-router";
import {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/member.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/member", isAuth, getMembers);

router.get("/member/:mem_id", isAuth, getMemberById);

router.post("/member", isAuth, createMember);

router.put("/member/:mem_id", isAuth, updateMember);

router.delete("/member/:mem_id", isAuth, deleteMember);

export default router;