import prisma from '../../prisma/Client/prismaClient.js'
import categories from "./category.js";

const createCategory = async () => {
    try {
        for (const category of categories) {
            console.log(`📌 Procesando categoría: ${category.name}`);

            await prisma.category.create({
                data: {
                    name: category.name,
                    flavors: {
                        connect: category.flavors.map(flavorId => ({ id: flavorId }))
                    },
                    sizes: {
                        connect: category.sizes.map(sizeId => ({ id: sizeId }))
                    }
                }
            });

            console.log(`✅ Categoría creada: ${category.name}`);
        }

        console.log("Categorias creadas correctamente")
    } catch (error) {
        console.log("Error al crear las categorias", error.message)
    }
}

createCategory()