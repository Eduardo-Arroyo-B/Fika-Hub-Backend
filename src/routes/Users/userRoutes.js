import express from 'express'
import {
    createUser,
    loginUser,
    getUsers
} from "../../controllers/Users/userController.js"
import cookiesValidation from "../../middlewares/cookiesValidation.js";

const router = express.Router();

router.post("/auth/createUser", createUser)
router.post("/auth/login", loginUser)
router.get("/auth/users", cookiesValidation , getUsers)

export default router