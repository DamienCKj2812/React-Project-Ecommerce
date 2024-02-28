import express from "express";
import { 
    createUser, 
    loginUser, 
    logoutCurrentUser, 
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById} from "../controllers/userController.js";
const router = express.Router();

//middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

//You are using middlewares (authenticate and authorizeAdmin) with the GET method for the route "/". 
//This means that when a GET request is made to the root path ("/"), the specified middleware will be executed
router.route("/")
    .post(createUser)
    .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router.route('/profile')
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUserProfile);

//Admin Roye
router.route('/:id')
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, updateUserById);

export default router;