import express from 'express'
import cookieParser from 'cookie-parser'
import usersRoutes from '../routes/Users/userRoutes.js'
import categoriesRoutes from '../routes/Categories/categoriesRoutes.js'
import ordersRoutes from '../routes/Orders/ordersRoutes.js'
import clientsRoutes from '../routes/Clients/clientsRoutes.js'

const app = express();

// Configuracion de puerto
app.set('port', process.env.PORT || 3000) // Configura el puerto del server o el local

// Middlewares
app.use(cookieParser(process.env.SECRET))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Endpoints
app.use("/users", usersRoutes)
app.use("/categories", categoriesRoutes)
app.use("/orders", ordersRoutes)
app.use("/clients", clientsRoutes)

// Verificar si el servidor esta vivo
app.use("/serverAlive", (req, res) => {
    res.status(200).json({ message: `Server is alive on port ${app.get("port")}` })
})

// Escuchar el puerto
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})