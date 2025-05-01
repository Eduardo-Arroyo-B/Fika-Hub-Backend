import prisma from '../../../prisma/Client/prismaClient.js'

const connectTraditional = async (req, res) => {
    // Conectar sabores con pasteles clasicos
    try {
        const nuevoPastel = await prisma.pasteles.create({
            data: {
                type: "TRADITIONAL",
                flavors: {
                    connect: [
                        { id: 15 },
                        { id: 16 },
                        { id: 17 },
                        { id: 18 },
                        { id: 19 }
                    ]
                },
                sizes: {
                    connect: [
                        { id: 1 },
                        { id: 3 },
                        { id: 4 },
                        { id: 5 },
                        { id: 6 }
                    ]
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