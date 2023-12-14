import Router from "express-promise-router";
import {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceById,
} from "../controllers/attendance.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {  attendanceSchema} from "../schemas/attendance.shema.js";


const router = Router();

router.get("/attendance", isAuth, getAttendance);
router.get("/attendance/:att_id", isAuth, getAttendanceById);
router.post("/attendance", isAuth, createAttendance);
router.put("/attendance/:att_id", isAuth, updateAttendance);
router.delete("/attendance/:att_id", isAuth, deleteAttendance);

export default router;
