import Router from "express-promise-router";
import {
  getOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  deleteOwner,
} from "../controllers/owner.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/owner", isAuth, getOwners);

router.get("/owner/:own_id", isAuth, getOwnerById);

router.post("/owner", isAuth, createOwner);

router.put("/owner/:own_id", isAuth, updateOwner);

router.delete("/owner/:own_id", isAuth, deleteOwner);

export default router