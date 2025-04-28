import prisma from '../../../prisma/Client/prismaClient.js'

const createOrder = async (req, res) => {
    const { userId, clientId, items } = req.body

    try {
        // Crea la orden
        const order = await prisma.orders.create({
            data: {
                User: {
                    connect: { id: Number(userId) }
                },
                Clients: {
                    connect: { id: Number(clientId) }
                },
            }
        })

        // Prepara los items de la orden
        const orderItems = items.map(item => ({
            ordersId: order.id,  // Relacionamos el item con la orden mediante ordersId
            pastelId: Number(item.pastelId),  // Usamos pastelId para la relación
            flavorId: Number(item.flavorId),  // Usamos flavorId
            sizeId: Number(item.sizeId),      // Usamos sizeId
            quantity: Number(item.quantity),   // Asignamos la cantidad
            mensaje: item.message,
            fechaRecoleccion: item.fechaRecoleccion,
        }));

        // Crea los items de la orden
        const createdOrderItems = await prisma.orderItem.createMany({
            data: orderItems
        });

        res.status(201).json({message: "Orden creada correctamente", createdOrderItems})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message || "Error al crear la orden" })
    }
}

const getOrder = async (req, res) => {

    try {

        // Obtener todas las ordenes
        const orders = await prisma.orders.findMany({
            include: {
                Clients: {
                    select: {
                        name: true,
                        email: true,
                        phone: true
                    }
                },
                OrderItem: {
                    select: {
                        quantity: true,
                        Pasteles: {
                            select: {
                                type: true,
                            }
                        },
                        Flavor: {
                            select: {
                                name: true,
                                ingredients: {
                                    select: {
                                        name: true
                                    }
                                },
                            }
                        },
                        Size: {
                            select: {
                                size: true,
                            }
                        },
                        mensaje: true,
                        fechaRecoleccion: true,
                        status: true,
                    }
                }
            }
        })

        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message || "Error al obtener las ordenes" })
    }
}

export {
    createOrder,
    getOrder
}