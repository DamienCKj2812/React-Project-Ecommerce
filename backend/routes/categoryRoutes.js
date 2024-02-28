import express from "express";
const router = express.Router();

import { authenticate , authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createCategory, updateCategory, removeCategory, listCategories, readCategory } from "../controllers/categoryController.js";



router.route('/').post(authenticate, authorizeAdmin, createCategory);

router.route('/:categoryId')
    .put(authenticate, authorizeAdmin, updateCategory)
    .delete(authenticate, authorizeAdmin, removeCategory);

router.route('/categories').get(listCategories);

router.route('/:id').get(readCategory);

export default router;