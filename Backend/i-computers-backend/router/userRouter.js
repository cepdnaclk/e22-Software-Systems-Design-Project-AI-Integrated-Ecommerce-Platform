import express from "express";
import {createUser,loginUser} from "../controllers/userController.js";

const userRouter = express.Router(); //create a router instance

userRouter.post("/",createUser)//.post request to create a new user,createUser function from userController.js
userRouter.post("/login",loginUser)//.post request to login a user,loginUser function from userController.js

export default userRouter; //export the router instance