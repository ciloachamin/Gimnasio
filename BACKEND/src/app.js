import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import placeRoutes from './routes/place.routes.js';
import productRoutes from './routes/product.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import detailRoutes from './routes/detail.routes.js';
import donationRoutes from './routes/donation.routes.js';
import exerciseRoutes from './routes/exercise.routes.js';
import invoiceRoutes from './routes/invoice.routes.js';
import manageRoutes from './routes/manage.routes.js';
import memberRoutes from './routes/member.routes.js';
import membershipRoutes from './routes/membership.routes.js';
import ownerRoutes from './routes/owner.routes.js';
import reservationRoutes from './routes/reservation.routes.js';
import routineRoutes from './routes/routine.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", placeRoutes);
app.use("/api", productRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", detailRoutes);
app.use("/api", donationRoutes);
app.use("/api", exerciseRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", manageRoutes);
app.use("/api", memberRoutes);
app.use("/api", membershipRoutes);
app.use("/api", ownerRoutes);
app.use("/api", reservationRoutes);
app.use("/api", routineRoutes);

export default app;
