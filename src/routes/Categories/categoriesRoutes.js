import express from 'express'
import {
    getCakes
} from "../../controllers/Categories/categoriesController.js"
import cookiesValidation from "../../middlewares/cookiesValidation.js"

const router = express.Router()

router.get('/getCakes', cookiesValidation ,getCakes)

export default router