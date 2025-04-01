import jwt from 'jsonwebtoken'

const validateCookies = (req, res, next) => {
    // Extraer el token de las cookies firmadas
    const token = req.signedCookies.token

    if (!token) {
        return res.status(401).json({ message: 'No se ha proporcionado un token' })
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.SECRET)

        if (!decoded) {
            return res.status(401).json({ message: 'Token invalido' })
        }

        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token invalido' })
    }
}

export default validateCookies