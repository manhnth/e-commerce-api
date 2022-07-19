require('dotenv').config();
require('express-async-errors');


const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');


// database 
const connectDB = require('./db/connect');

const errorHandlerMiddleware = require('./middleware/error-handler');
// routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const reviewRouter = require('./routes/reviewRoutes');

app.get('/', (req, res) => {
  res.send('server')
})

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
// app.use('/api/v1/orders', orderRouter);
// app.use('api/v1/reviews', reviewRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log(error);
  }
};

start();