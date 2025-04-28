import express from 'express'
import {
    createClient
} from '../../controllers/Clients/clientsController.js'

const router = express.Router()

router.post('/createClient', createClient)

export default router