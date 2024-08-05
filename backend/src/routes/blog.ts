import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: "string";
    JWT_SECRET: "string";
  };
}>();

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: 1,
      },
    });
    return c.json({
      msg: "Blog successfully created",
      id: user.id,
    });
  } catch (e) {
    return c.json({
      msg: "Error",
      error: e,
    });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      msg: "Blog successfully created",
      id: user.id,
    });
  } catch (e) {
    return c.json({
      msg: "Error",
      error: e,
    });
  }
});

blogRouter.get(" /:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.blog.findFirst({
      where: {
        id: body.id,
      },
    });
    return c.json({
      msg: "Blog successfully created",
      blog: user,
    });
  } catch (e) {
    return c.json({
      msg: "Error",
      error: e,
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // const body = await c.req.json();

  try {
    const user = await prisma.blog.findMany({});
    return c.json({
      msg: "Blog successfully created",
      blogs: user,
    });
  } catch (e) {
    return c.json({
      msg: "Error",
      error: e,
    });
  }
});
