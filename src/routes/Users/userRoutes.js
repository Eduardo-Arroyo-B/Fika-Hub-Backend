import express from 'express'
import {
    createUser, loginUser
} from "../../controllers/Users/userController.js"

const router = express.Router();

router.post("/auth/createUser", createUser)
router.post("/auth/login", loginUser)

export default router