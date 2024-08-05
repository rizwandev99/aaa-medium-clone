import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
const app = new Hono();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
// interface CustomContext {
//   jwtPayload?: string;
//   userId?: string;
// }
// interface bindings {
//   DATABASE_URL: "string";
//   JWT_SECRET: "string";
//   // token: "string";
// }
// const app = new Hono<{
//   Bindings: bindings;
//   Variables: CustomContext;
// }>();

// app.use("/api/v1/blog/*", async (c, next) => {
//   const jwt = c.req.header("authorization");
//   if (!jwt) {
//     return c.json({ msg: "No token present" });
//   }
//   const token = await verify(jwt, c.env.JWT_SECRET);

//   if (!token) {
//     c.status(401);
//     return c.json({ error: "unAuthorized" });
//   }

//   //@ts-ignore
//   c.set("userId", token.id);

//   await next();
// });

// export default app;
