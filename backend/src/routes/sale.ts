import { Hono } from "hono"
import { verify } from "hono/jwt"

export const saleRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
      },
      Variables: {
        prisma: any,
        userId: any,
      }
}>()

saleRoutes.use("*", async (c, next) => {
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

saleRoutes.post("/create", async(c) => {
    const prisma = c.get("prisma")
    const userId = c.get("userId")
    const body = await c.req.json()
    const productIds: {id: string, quantity: number, productname: string, price: number}[] = body.productIds

    const saleMonth: number = body?.month || new Date().getMonth() + 1
    const saleYear : number = body?.year || new Date().getFullYear() 
    try {
        
        try {
            const customer = await prisma.customer.create({
                data: {
                    userId: userId,
                    name: body.customername,
                    address: body.address,
                    number: body.number,
                    email: body.email,
                    city: body.city,
                }
            })
        } catch (error) {
            console.log("customer already esist")
        }

        const sale = await prisma.sale.create({
            data: {
                itemname: body.itemname,
                items: productIds,
                quantity: body.quantity,
                category: body?.category ?? "generic",
                paymentmethod: body?.paymentmethod ?? "cash",
                totalPrice: body.totalPrice,
                number: body.number,
                userId: userId,
                month: saleMonth,
                year: saleYear,
                product: {
                    connect: productIds.map((product: any) => ({ id: product.id}))                    
                }
            },

            include: {
                customer: true,
                product: {
                    select: {
                        id: true,
                        productId: true,
                        name: true,
                        brand: true,
                        quantity: true
                    }
                }
            }
        })

        //updating product quantity
        if(sale) {      
            try {
                for(let i = 0; i < productIds.length; i++) {
                    const product = sale.product.filter((item: any) => item.id === productIds[i].id)
                    await prisma.product.update({
                        where: {
                            id: productIds[i].id 
                        },
                        data: {
                            quantity: product[0].quantity - productIds[i].quantity
                        }
                    })
                }    
            } catch (error) {
                console.log("product quantity not updated.")
            }      
            
        }

        //updating customer total purchase value - tpv
        if(sale) {
            try {
                const customer = await prisma.customer.update({
                    where: {
                        // userId: userId,
                        number: sale.customer.number,
                    },
                    data: {
                        tpv: sale.customer.tpv + sale.totalPrice
                    }
                })        
            } catch (error) {
                console.log("total purchase value not updated")
            }
            
        }


        c.status(200)
        return c.json({
            success: true,
            status: 200,
            sale: sale,
        })
    } catch (error) {

     console.log(error)
     return c.json({
        success: false,
        status: 500,
        message: "sale not created",
     })   
    }
})

saleRoutes.get("/get", async(c) => {
    const prisma = c.get("prisma")
    const userId = c.get("userId")

    try {
        const sales = await prisma.sale.findMany({
            where: {
                userId: userId,
                year: new Date().getFullYear(),
            }   
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200,
            sales: sales
        })
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            status: 400,
        })
    }
})

saleRoutes.get("/get/:id", async(c) => {
    const prisma = c.get("prisma")
    const id = c.req.param("id")

    try {
        const sales = await prisma.sale.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                product: true,
                customer: true,
            }
        })
        c.status(200)
        return c.json({
            success: true,
            status: 200,
            sales: sales
        })
        
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            status: 400,
        })
    }
})

saleRoutes.delete("/delete/:id", async (c)=> {
    const prisma = c.get("prisma")
    const id = c.req.param("id")

    try {
        const sale = await prisma.sale.delete({
            where: {
                id: parseInt(id)
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