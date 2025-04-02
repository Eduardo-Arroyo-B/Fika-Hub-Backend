import prisma from '../../../prisma/Client/prismaClient.js'

const connectSPONGE_CAKE = async (req, res) => {
    // Conectar sabores con pasteles clasicos
    try {
        const nuevoPastel = await prisma.pasteles.create({
            data: {
                type: "SPONGE_CAKE",
                flavors: {
                    connect: [
                        { id: 2 },
                        { id: 10 },
                        { id: 11 },
                        { id: 12 },
                        { id: 13 },
                    ] // Conectar sabores existentes
                },
                sizes: {
                    connect: [
                        { id: 1 },
                        { id: 4 },
                        { id: 6 }
                    ] // Conectar tamaños existentes
                }
            }
        })

        if (!nuevoPastel) {
            console.log('Ha ocurrido un error al agregar los sabores y tamaños a los pasteles sponge cake')
        }

        console.log('Se han agregado los sabores y tamaños a los pasteles sponge cake')

    } catch (error) {
        console.log('Ha ocurrido un error', error.message)
    }
}

connectSPONGE_CAKE()