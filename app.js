require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// REST OF THE PACKAGES
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// USE CLOUDINARY V2
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// MIDDLEWARE
const errorHandlerMiddleware = require('./middleware/error-handler');

// DATABASE
const connectDB = require('./db/connect');

// ROUTERS
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
app.use(fileUpload({ useTempFiles: true }));

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