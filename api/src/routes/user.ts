import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
// import { compare, hash } from "bcrypt"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


userRouter.post('/signup', async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        // const hashed_password = await hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                username: body.username,
                password: body.password
            }
        });

        const jwt = await sign({
            id: user.id,
            email: user.email
        }, c.env.JWT_SECRET)

        c.status(200);
        return c.json({
            user: user.name,
            message: "User created successfully",
            jwt: jwt
        });
    } catch (e) {
        console.log(e);
        c.status(400);
        return c.text('Something went wrong');
    }
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password

            }
        });

        if (!user) {
            c.status(403);
            return c.text('Invalid credentials');
        }

        // const passwordMatch = await compare(body.password, user.password);

        // if (!passwordMatch) {
        //     c.status(403);
        //     return c.text('Invalid credentials');
        // }

        const jwt = await sign({
            id: user.id,
            email: user.email
        }, c.env.JWT_SECRET)

        c.status(200);
        return c.json({
            user: user.name,
            message: "User signedIn successfully",
            jwt: jwt
        });
    } catch (e) {
        console.log(e);
        c.status(400);
        return c.text('Something went wrong');
    }
})