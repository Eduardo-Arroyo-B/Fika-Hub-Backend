import express from 'express'
import {
    createOrder,
    getOrder
} from "../../controllers/Orders/ordersController.js"

const router = express.Router()

router.post('/createOrder', createOrder)
router.get('/getOrders', getOrder)

export default router