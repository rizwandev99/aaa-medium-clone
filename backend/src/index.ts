import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

interface CustomContext {
  jwtPayload?: string;
  userId?: string;
}
interface bindings {
  DATABASE_URL: "string";
  JWT_SECRET: "string";
  // token: "string";
}
const app = new Hono<{
  Bindings: bindings;
  Variables: CustomContext;
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("authorization");
  if (!jwt) {
    return c.json({ msg: "No token present" });
  }
  const token = await verify(jwt, c.env.JWT_SECRET);

  if (!token) {
    c.status(401);
    return c.json({ error: "unAuthorized" });
  }

  //@ts-ignore
  c.set("userId", token.id);

  await next();
});

app.post("/api/v1/user/signup", async (c) => {
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
  } catch (e) {
    c.status(411);
    return c.text("Invalid");
  }

  // const token = await sign({ user: user.id }, c.env.JWT_SECRET);

  // return c.json({ msg: "Signed up successfully", token: token });

  return c.text("Signed Up!!!");
});

app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
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

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ jwt });
});

app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.get(" /api/v1/blog/:id", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Hello Hono!");
});

export default app;
