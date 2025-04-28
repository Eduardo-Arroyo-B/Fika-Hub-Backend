import prisma from '../../../prisma/Client/prismaClient.js'

const createClient = async (req, res) => {
    // Extraer datos del body
    const { name, email, phone } = req.body

    try {
        // Crear el cliente
        const client = await prisma.clients.create({
            data: {
                name,
                email,
                phone
            }
        })

        return res.status(201).json({ message: "Cliente creado exitosamente", client })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export {
    createClient
}