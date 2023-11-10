import Router from "express-promise-router";
import {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoice.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/invoice", isAuth, getInvoices);

router.get("/invoice/:inv_id", isAuth, getInvoiceById);

router.post("/invoice", isAuth, createInvoice);

router.put("/invoice/:inv_id", isAuth, updateInvoice);

router.delete("/invoice/:inv_id", isAuth, deleteInvoice);

export default router;