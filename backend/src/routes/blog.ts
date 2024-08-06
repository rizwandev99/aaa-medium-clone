import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { Variables } from "hono/types";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    authorId: number;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const auth = c.req.header("authorization") || " ";
  const jwt = await verify(auth, c.env.JWT_SECRET);

  if (jwt) {
    c.set("authorId", Number(jwt.user));
    await next();
  } else {
    c.status(403);
    return c.json({
      msg: "Authentication Declined",
    });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get("authorId");

  try {
    const user = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
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
      body: user,
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

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log("Hello from get");
  const id = c.req.param("id");
  console.log("--id--", id);
  try {
    const user = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
    });
    return c.json({
      msg: "Blog fetched created",
      blog: user,
    });
  } catch (e) {
    return c.json({
      msg: "Error",
      error: e,
    });
  }
});
