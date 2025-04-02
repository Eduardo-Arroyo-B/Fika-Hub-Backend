import prisma from '../../../prisma/Client/prismaClient.js'

const connectClasic = async (req, res) => {
    // Conectar sabores con pasteles clasicos
    try {
        const nuevoPastel = await prisma.pasteles.create({
            data: {
                type: "DELUXE",
                flavors: {
                    connect: [
                        { id: 7 },
                        { id: 1 },
                        { id: 8 },
                        { id: 9 },
                        { id: 5 },
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
                        { id: 8 },
                    ] // Conectar tamaños existentes
                }
            }
        })

        if (!nuevoPastel) {
            console.log('Ha ocurrido un error al agregar los sabores')
        }

        console.log('Se han agregado los sabores a los pasteles clasicos')

    } catch (error) {
        console.log('Ha ocurrido un error', error.message)
    }
}

connectClasic()