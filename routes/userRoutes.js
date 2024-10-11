import express from "express";
import { loginUser, postUser } from "../controllers/userControllers.js";

const userRouter = express.Router() //express framework eke router kiyn podi park ekk samana kra

// userRouter.get("/",getUser)

userRouter.post("/", postUser)
userRouter.post("/login",loginUser)

// userRouter.put("/",putUser)

// userRouter.delete("/",deleteUser)

export default userRouter;