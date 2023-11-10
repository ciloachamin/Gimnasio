import Router from "express-promise-router";
import {
  getManages,
  getManageById,
  createManage,
  updateManage,
  deleteManage,
} from "../controllers/manage.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/manage", isAuth, getManages);

router.get("/manage/:pla_id/:own_id", isAuth, getManageById);

router.post("/manage", isAuth, createManage);

router.put("/manage/:pla_id/:own_id", isAuth, updateManage);

router.delete("/manage/:pla_id/:own_id", isAuth, deleteManage);

export default router;