import express from "express";
import {getUsers, addUser, getUserById} from "../controllers/userController.js"

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/add-user", addUser);

export default router;