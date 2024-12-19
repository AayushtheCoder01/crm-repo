import { Hono } from "hono"
import { verify } from "hono/jwt"

export const customerRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
      },
      Variables: {
        prisma: any,
        userId: any,
      }
}>()

customerRoutes.use("*", async (c, next) => {
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

customerRoutes.get("/get", async (c) => {
    const prisma = c.get("prisma")
    const userId = c.get("userId")

    try {
        const customer = await prisma.customer.findMany({
            where: {
                userId: userId
            }
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200,
            customer: customer
        })   
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            status: 400
        })
    }
})

customerRoutes.post("/create", async(c) => {
    const prisma = c.get("prisma")
    const userId = c.get("userId")
    const body = await c.req.json()

    try {
        const customer = await prisma.customer.create({
            data: {
                userId: userId,
                name: body.customername,
                address: body.address,
                number: body.number,
                email: body.email,
                city: body.city
            }
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200,
            customer: customer
        })
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            status: 400
        })
    } 
})

customerRoutes.get("/get/:number", async(c) => {
    const prisma = c.get("prisma")
    const number = c.req.param("number")
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                number: parseInt(number)
            },
            select: {
                id: true,
                name: true,
                address: true,
                number: true,
                email: true,
                city: true,
                tpv: true,
                purchases: true,
                createdAt: true,
            }
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200,
            customer: customer
        })
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            status: 400
        })
    }
})

customerRoutes.put("update/:number", async (c) => {
    const prisma = c.get("prisma")
    const number = c.req.param("number")
    const body = await c.req.json()
    try {
        const customer = await prisma.customer.update({
            where: {
                number: parseInt(number)
            },
            data: {
                name: body.customername,
                address: body.address,
                email: body.email,
                city: body.city,
                tpv: body.tpv
            }
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200,
            customer: customer,
        })
    } catch (error) {
        c.status(400)
        return c.json({
            success: true,
            status: 400,
        })
    }
})

customerRoutes.delete("/delete/:number", async (c)=> {
    const prisma = c.get("prisma")
    const number = c.req.param("number")
    try {
        const customer = await prisma.customer.delete({
            where: {
                number: parseInt(number)
            }
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200
        })
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            status: 400
        })
    }
})


// custom filters
customerRoutes.post("/filter", async(c) => {
    const prisma = c.get("prisma")
    const userId = c.get("userId")
    const body = await c.req.json()
    try {
        const customer = await prisma.customer.findMany({
            where : {
                userId: userId,
                name: {
                    contains: body.name || undefined,
                    mode: "insensitive"
                },
                number: body.number || undefined,
                email: {
                    contains: body.email || undefined,
                    mode: "insensitive"
                },
                city: {
                    contains: body.city || undefined,
                    mode: "insensitive"
                },
                address: {
                    contains: body.address || undefined,
                    mode: "insensitive"
                }
            },
            include: {
                purchases: true
            }
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200,
            customer: customer
        })
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            status: 400,
        })
    }
})