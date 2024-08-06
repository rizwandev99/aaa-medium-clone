import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@rizwandev99/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: "string";
    JWT_SECRET: "string";
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect inputs",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.email,
      },
    });

    const token = await sign({ user: user.id }, c.env.JWT_SECRET);

    return c.json({ msg: "Signed up successfully", token: token });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "db error",
      error: e,
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect inputs",
    });
  }
  try {
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
    const token = await sign({ user: user.id }, c.env.JWT_SECRET);
    return c.json({ msg: "Sign-IN successfully", token: token });
  } catch (e) {
    c.status(411);
    return c.text("Invalid");
  }

  return c.text("Sign-IN Successfully");
});
