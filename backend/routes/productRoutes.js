import express from "express";
import formidable from "express-formidable"; //Formidable is particularly useful when dealing with HTML forms that include file uploads. 
                                             //It simplifies the process of parsing form data and handling file uploads

const router = express.Router();

// controllers
import { addProduct, updateProductDetails, removeProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProduct, fetchNewProduct, filterProducts } from "../controllers/productContoller.js";

import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router.route('/')
    .get(fetchProducts)
    .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route('/allproducts')
    .get(fetchAllProducts);

router.route('/:id/reviews')
    .post(authenticate, checkId, addProductReview);

router.get('/top', fetchTopProduct);

router.get('/new', fetchNewProduct);

router.route('/:id')
    .get(fetchProductById)
    .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
    .delete(authenticate, authorizeAdmin, removeProduct);

router.route('/filtered-products').post(filterProducts);




export default router;