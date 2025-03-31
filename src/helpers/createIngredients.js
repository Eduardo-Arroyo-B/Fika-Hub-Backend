import prisma from '../../prisma/Client/prismaClient.js'
import ingredients from '../helpers/flavors.js'

const createIngredients = async () => {
    const newIngredient = await prisma.ingredients.createMany({
        data: ingredients.map(ingredient => ({
            name: ingredient.name
        }))
    })

    if (!newIngredient) {
        console.log("Error al crear los ingredientes")
    }

    console.log("Ingredientes creados correctamente")
}

createIngredients()