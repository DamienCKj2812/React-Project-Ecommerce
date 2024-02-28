//packages
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//Utiles
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);


app.get('/api/config/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();  //is used to obtain the absolute path of the current working directory. This  sets __dirname to the absolute path of the current working directory.

// express.static(...) is middleware provided by Express for serving static files. It takes a directory path as an argument and returns middleware that serves files from that directory.
// path.join(__dirname, '/uploads') creates the absolute path to the 'uploads' directory by joining the current working directory (__dirname) with the 'uploads' subdirectory.
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

app.listen(port, () => console.log(`Server running on port ${port}`));