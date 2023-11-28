import Router from "express-promise-router";
import {
  profile,
  signin,
  signout,
  signup,
  getUsuarios,
} from "../controllers/auth.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { signinSchema, signupSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/signin", validateSchema(signinSchema),signin);

router.post("/signup", signup);

router.post("/signout", signout);

router.get("/owner", getUsuarios);

router.get("/profile", isAuth, profile);

export default router;