import prisma from '../../prisma/Client/prismaClient.js'

const createCategory = async (req, res) => {
    const newCategory = await prisma.categories.create({
        data: {
            category: {
                create: [
                    { name: "Normal"},
                    { name: "Pisos"},
                    { name: "Numero"}
                ]
            }
        }
    })

    if (!newCategory) {
        console.log("Error al crear las categorias")
    }

    console.log("Categorias creadas correctamente")
}

createCategory()