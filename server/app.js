import express from 'express';
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import orderRoutes from './routes/order.routes.js';
import cors from 'cors';



const app = express();
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/orders', orderRoutes);

export default app;


