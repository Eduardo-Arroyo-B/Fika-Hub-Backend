import prisma from '../../prisma/Client/prismaClient.js'
import flavors from '../helpers/flavors.js'

const createFlavors = async () => {
    const newFlavors = await prisma.flavors.createMany({
        data: flavors.map(flavor => ({
            name: flavor.name
        }))
    })

    if (!newFlavors) {
        console.log("Error al crear los sabores")
    }

    console.log("Sabores creados correctamente")
}

createFlavors()