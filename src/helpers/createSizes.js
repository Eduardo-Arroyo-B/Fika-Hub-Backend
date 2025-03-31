import prisma from '../../prisma/Client/prismaClient.js'
import sizes from '../helpers/sizes.js'

const createSizes = async () => {
    const newSizes = await prisma.sizes.createMany({
        data: sizes.map(sizes => ({
            name: sizes.name
        }))
    })

    if (!newSizes) {
        console.log("Error al crear los tamaños")
    }

    console.log("Tamaños creados correctamente")
}

createSizes()