import express from 'express';
import goalRouter from './routes/goalRouter.js';
import errorHandler from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import userRouter from './routes/userRouter.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded());


app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);
app.listen(5000, () => console.log('Server is listening at 5000'));


