import Router from "express-promise-router";
import {
  getDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
} from "../controllers/donation.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/donations", isAuth, getDonations);

router.get("/donations/:don_id", isAuth, getDonationById);

router.post("/donations", isAuth, createDonation);

router.put("/donations/:don_id", isAuth, updateDonation);

router.delete("/donations/:don_id", isAuth, deleteDonation);

export default router;
