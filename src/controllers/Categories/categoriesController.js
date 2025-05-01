import prisma from '../../../prisma/Client/prismaClient.js'

const getCakes = async (req, res) => {
    // Obtener todas las categorias
    try {
        const pasteles = await prisma.pasteles.findMany({
            include: {
                flavors: {
                    include: {
                        ingredients: true
                    }
                },
                sizes: true
            }
        })


        if (!pasteles) {
            return res.status(404).json({ message: 'No se encontraron categorias' })
        }

        return res.status(200).json({ pasteles })

    } catch (error) {
        return res.status(400).json({ message: 'Ha ocurrido un error', error: error.message })
    }
}



export {
    getCakes
}