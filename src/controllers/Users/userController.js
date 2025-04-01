import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from "../../../prisma/Client/prismaClient.js"

const createUser = async (req, res) => {
    // Extrar datos del body
    const { user, email, password } = req.body

    // Validar los campos que contengan informacion
    await check('user').notEmpty().withMessage('El nombre de usuario es obligatorio').run(req)
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    try {
        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createUser = await prisma.user.create({
            data: {
                user,
                email,
                password: hashedPassword
            }
        })

        if (!createUser) {
            return res.status(400).json({ message: 'Error al crear el usuario' })
        }

        // Genera el token de acceso
        const token = jwt.sign({ id: createUser.id }, process.env.SECRET, { expiresIn: '8h' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            signed: true,
            maxAge: 8 * 60 * 60 * 1000 // 8 horas
        })
        res.status(201).json({ message: 'Usuario creado correctamente', user: createUser })

    } catch (error) {
        return res.status(400).json({ message: 'Ha ocurrido un error' , error: error.message })
    }
}

const loginUser = async (req, res) => {
    // Extrar datos del body
    const { user, password } = req.body

    // Validar los campos que contengan informacion
    await check('user').notEmpty().withMessage('El nombre de usuario es obligatorio').run(req)
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    try {
        // Buscar el usuario en la base de datos
        const loginUser = await prisma.user.findFirst({
            where: {
                user
            }
        })

        // Verificar la contraseña hasheada
        const comparePassword = await bcrypt.compare(password, loginUser.password)

        if (!comparePassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta, favor de verificarla' })
        }

        if (!loginUser) {
            return res.status(400).json({ message: 'Error al iniciar sesion' })
        }

        // Genera el token de acceso
        const token = jwt.sign({ id: createUser.id }, process.env.SECRET, { expiresIn: '8h' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            signed: true,
            maxAge: 8 * 60 * 60 * 1000 // 8 horas
        })

        return res.status(200).json({ message: 'Sesion iniciada correctamente', user: loginUser })

    } catch (error) {
        return res.status(400).json({ message: 'Ha ocurrido un error' , error: error.message })
    }
}

const getUsers = async (req, res) => {
    // Obtiene los usuarios
    try {
        const users = await prisma.user.findMany()

        if (!users) {
            return res.status(400).json({ message: 'Error al obtener los usuarios' })
        }

        return res.status(200).json({ message: 'Usuarios obtenidos correctamente', users })

    } catch (error) {
        return res.status(400).json({ message: 'Ha ocurrido un error' , error: error.message })
    }
}

export {
    createUser,
    loginUser,
    getUsers
}