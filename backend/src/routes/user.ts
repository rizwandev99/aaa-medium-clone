import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: "string";
    JWT_SECRET: "string";
  };
}>();

userRouter.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        username: body.email,
        password: body.password,
        name: body.email,
      },
    });

    const token = await sign({ user: user.id }, c.env.JWT_SECRET);

    return c.json({ msg: "Signed up successfully", token: token });
  } catch (e) {
    c.status(411);
    return c.text("Invalid");
  }

  return c.text("Signed Up!!!");
});

userRouter.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const user = await prisma.user.findFirst({
      where: {
        username: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ msg: "Invalid user" });
    }
    console.log(user);
    // const token = await sign({ user: user.id }, c.env.JWT_SECRET);
    // return c.json({ msg: "Signed up successfully", token: token });
  } catch (e) {
    c.status(411);
    return c.text("Invalid");
  }

  return c.text("Sign-IN Successfully");
});
