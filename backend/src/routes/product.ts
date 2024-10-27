import { Hono } from "hono"
import { verify } from "hono/jwt"

export const productRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
      },
      Variables: {
        prisma: any,
        userId: any,
      }
}>()

productRoutes.use("*", async (c, next) => {
    const token: any = c.req.header("Authorization")

    try {
        const validate = await verify(token, c.env.JWT_SECRET)
        c.set("userId", validate.id)
        await next()
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            message: "unauthorized user",
        })
    }
})

productRoutes.post("/create", async(c) => {
    const prisma = c.get("prisma")
    const userId = c.get("userId")
    const body = await c.req.json()
    try {
        const product = await prisma.product.create({
            data: {
                userId: userId,
                productId: body.productId,
                name: body.name,
                description: body.description,
                quantity: body.quantity,
                purchasePrice: body.purchasePrice,
                brand: body.brand,
            }
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200,
            message: "product created successfully",
            product: product
        })
        
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            status: 400,
            message: "product not created",
        })
        
    }
}) 

productRoutes.get("/get", async(c) => {
    const prisma = c.get("prisma")
    const userId = c.get("userId")

    try {
        const products = await prisma.product.findMany({
            where: {
                userId: userId,
            },
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200,
            products: products
        })
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            status: 400,
        })
    }
})

productRoutes.get("/get/:id", async(c) => {
    const prisma = c.get("prisma")
    const id = c.req.param("id")

    try {
        const product = await prisma.product.findFirst({
            where: {    
                productId: id,
            },
            include: {
                sales: true
            }
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200,
            product: product
        })  
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            status: 400,
        })
    }
})

productRoutes.delete("/delete/:id", async(c) => {
    const prisma = c.get("prisma")
    const id = c.req.param("id")

    try {
        const product = await prisma.product.delete({
            where: {
                productId: id
            }
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200,

        })
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            status: 400,
        })
    }
})