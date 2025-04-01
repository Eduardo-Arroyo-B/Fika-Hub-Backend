import express from 'express'
import cookieParser from 'cookie-parser'
import usersRoutes from '../routes/Users/userRoutes.js'
import categoriesRoutes from '../routes/Categories/categoriesRoutes.js'

const app = express();

// Configuracion de puerto
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(cookieParser(process.env.SECRET))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Endpoints
app.use("/users", usersRoutes)
app.use("/categories", categoriesRoutes)

// Verificar si el servidor esta vivo
app.use("/serverAlive", (req, res) => {
    res.status(200).json({ message: `Server is alive on port ${app.get("port")}` })
})

// Escuchar el puerto
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})