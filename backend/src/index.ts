import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { cors } from 'hono/cors'
import { saleRoutes } from './routes/sale'
import { userRoutes } from './routes/user'
import { productRoutes } from './routes/product'
import { customerRoutes } from './routes/coustomer'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string    
  },
  Variables: {
    prisma: any,
    userId: any,
  }
}>() 

app.use('*', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  c.set("prisma", prisma)
  await next()
})
app.use(cors())

app.route("/api/v1/product", productRoutes)
app.route("/api/v1/sale", saleRoutes)
app.route("/api/v1/user", userRoutes)
app.route("api/v1/customer", customerRoutes)

export default app

