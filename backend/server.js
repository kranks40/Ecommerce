
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import orderRouter from './routers/orderRouter.js';

import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();
const app = express();
//we need to parse the body of the http request
//by adding these two middleware all request to data would be translated
//to the application

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use(( err, req, res, next ) => {
  res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});