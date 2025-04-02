import prisma from '../../../prisma/Client/prismaClient.js'

const connectTraditional = async (req, res) => {
    // Conectar sabores con pasteles clasicos
    try {
        const nuevoPastel = await prisma.pasteles.create({
            data: {
                type: "TRADITIONAL",
                category: {
                    connect: [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                        { id: 4 },
                        { id: 5 }
                    ]
                },
                flavors: {
                    connect: [
                        { id: 1 },
                    ] // Conectar sabores existentes
                },
                sizes: {
                    connect: [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                        { id: 5 },
                        { id: 6 },
                        { id: 7 },
                        { id: 8 }
                    ] // Conectar tamaños existentes
                }
            }
        })

        if (!nuevoPastel) {
            console.log('Ha ocurrido un error al agregar los sabores y tamaños a los pasteles Traditional')
        }

        console.log('Se han agregado los sabores y tamaños a los pasteles Traditional')

    } catch (error) {
        console.log('Ha ocurrido un error', error.message)
    }
}

connectTraditional()