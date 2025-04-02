import prisma from '../../prisma/Client/prismaClient.js'
import flavors from '../helpers/flavors.js'

const createFlavors = async () => {

    try {
        for (const flavor of flavors) {
            console.log("Sabor agregado correctamente: ", flavor.name)

            await prisma.flavors.create({
                data: {
                    name: flavor.name,
                    ingredients: {
                        connect: flavor.ingredients.map(ingredient => ({id: ingredient}))
                    }
                }
            })
        }
        console.log("Sabores creados correctamente")

    } catch (error) {
        console.log("Ha ocurrido un error al crear los sabores y sus relaciones: ", error.message)
    }
}

createFlavors()