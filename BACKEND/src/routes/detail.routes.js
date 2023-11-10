import Router from "express-promise-router";
import {
  getDetails,
  getDetailById,
  createDetail,
  updateDetail,
  deleteDetail,
} from "../controllers/detail.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/details", isAuth, getDetails);

router.get("/details/:det_id", isAuth, getDetailById);

router.post("/details", isAuth, createDetail);

router.put("/details/:det_id", isAuth, updateDetail);

router.delete("/details/:det_id", isAuth, deleteDetail);

export default router;
