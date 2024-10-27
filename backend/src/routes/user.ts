import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "medium-common-app";

export const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
      },
      Variables: {
        prisma: any,
      }
}>();
  

userRoutes.post('/signup', async (c) => {
    // const prisma = new PrismaClient().$extends(withAccelerate())
    const prisma = c.get("prisma")
  
    const body = await c.req.json();
      const { success } = signupInput.safeParse(body);
      if (!success) {
          c.status(400);
          return c.json({ error: "invalid input" });
      }
      try {
          const user = await prisma.user.create({
              data: {
                  name: body.name || null,
                  email: body.username,
                  password: body.password
              }
          });
          const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
          c.status(200)
        return c.json({
            success: true,
            message: "user created successfully",
            jwt
        });
      } catch(e) {
        c.status(400)
        return c.json({
            success: false,
            message: "user already exists",
        });
      } 
  })
  
  userRoutes.post('/signin', async (c) => {
    const prisma = c.get("prisma")
  
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body)
    try {
      if(!success) throw 'wrong input'
      const user = await prisma.user.findFirst({
        where: {
          email: body.username,
          password: body.password,
        }
      });

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        c.status(200)
        return c.json({
            success: true,
            message: "user signed in successfully",
            jwt
        });
        
    } catch (error) {
        c.status(400)
        return c.json({
            success: false,
            message: "wrong credentials",
        });
    }
  })

  userRoutes.get("/tokenlogin", async (c) => {
    const prisma = c.get("prisma")
    const jwt: any = await c.req.header("Authorization")

    try {
      const validate = await verify(jwt, c.env.JWT_SECRET)
      const user = await prisma.user.findFirst({
        where: {  
          id: validate.id
        },
        select: {
          id: true,
          name: true,
          email: true,
          customers: true,
          products: true,
          sales: true
        }
      })

      c.status(200)
      return c.json({
        success: true,
        status: 200,
        user: user
      })
    } catch (error) {
      c.status(400)
      return c.json({
        success: false,
        status: 400
      })
    }
  })

  userRoutes.delete("/delete" , async (c) => {
    
      const token: any = await c.req.header("Authorization")
      const prisma = c.get("prisma")

      try {
          const validate = await verify(token, c.env.JWT_SECRET)
          console.log(validate)
        const user = await prisma.user.delete({
            where: {
              id: validate.id
            }
          })
          c.status(200)
          return c.json({
            success: true,
            message: "user deleted successfully",
            user
          })  
      } catch (error) {
        c.status(400)
          return c.json({
            success: false,
            message: "user not deleted",
          })
      }
      
  })