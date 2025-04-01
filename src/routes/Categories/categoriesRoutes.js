import express from 'express'
import {
    getCategories
} from "../../controllers/Categories/categoriesController.js"
import cookiesValidation from "../../middlewares/cookiesValidation.js"

const router = express.Router()

router.get('/getCategories', cookiesValidation ,getCategories)

export default router