import Router from "express-promise-router";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/product", isAuth, getProducts);

router.get("/product/:id", isAuth, getProduct);

router.post("/product", isAuth, createProduct);

router.put("/product/:id", isAuth, updateProduct);

router.delete("/product/:id", isAuth, deleteProduct);

export default router;
