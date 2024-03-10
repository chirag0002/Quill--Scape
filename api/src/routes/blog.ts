import { Context, Hono, Next } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

const authenticate = async (c:Context, next:Next) => {
    const token = await c.req.header('authorization') || "";
    const user = await verify(token, c.env.JWT_SECRET);

    if (user) {
        c.set('userId', user.id);

        await next();
    } else {
        c.status(403);
        return c.json({
            message: "Unauthorized"
        });
    }
}

blogRouter.post('/', authenticate, async (c) => {
    const body = await c.req.json();
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                authorId: Number(userId),
                content: body.content,
                thumbnail: body.thumbnail,
            }
        })

        c.status(200);
        return c.json({
            message: "Blog created successfully",
            id: blog.id
        });
    } catch (e) {
        console.log(e);
        c.status(400);
        return c.text('Something went wrong');
    }
})

blogRouter.get('/bulk/me', authenticate, async (c) => {
    const page = c.req.query("page") || 1;
    const pageSize = c.req.query("pageSize") || 10;

    const userId = c.get('userId')

    const prsima = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const skip = (Number(page) - 1) * Number(pageSize);

        const blogs = await prsima.blog.findMany({
            where:{
                authorId: Number(userId)
            },
            take: Number(pageSize),
            skip: skip,
            orderBy: {
                id: 'desc' 
            },
            select:{
                id:true,
                title:true,
                content:true,
                thumbnail:true,
                published_at:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });

        c.status(200);
        return c.json({
            blogs: blogs
        })
    } catch (e) {
        console.log(e);
        c.status(400);
        return c.text('Something went wrong');
    }
})

blogRouter.get('/bulk', async (c) => {
    const page = c.req.query("page") || 1;
    const pageSize = c.req.query("pageSize") || 10;

    const prsima = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const skip = (Number(page) - 1) * Number(pageSize);

        const blogs = await prsima.blog.findMany({
            take: Number(pageSize),
            skip: skip,
            orderBy: {
                id: 'desc' 
            },
            select:{
                id:true,
                title:true,
                content:true,
                thumbnail:true,
                published_at:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });

        c.status(200);
        return c.json({
            blogs: blogs
        })
    } catch (e) {
        console.log(e);
        c.status(400);
        return c.text('Something went wrong');
    }
})


blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                thumbnail:true,
                published_at:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })

        c.status(200);
        return c.json({
            blog: blog
        });
    } catch (e) {
        console.log(e);
        c.status(400);
        return c.text('Something went wrong');
    }
})