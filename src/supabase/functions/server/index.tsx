import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as student from "./student.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-68e7fa3d/health", (c) => {
  return c.json({ status: "ok" });
});

// Student routes
app.post("/make-server-68e7fa3d/signup", student.signup);
app.get("/make-server-68e7fa3d/profile", student.getProfile);
app.post("/make-server-68e7fa3d/enrollments", student.enrollCourse);
app.get("/make-server-68e7fa3d/enrollments", student.getEnrollments);
app.post("/make-server-68e7fa3d/grades", student.addGrade);
app.get("/make-server-68e7fa3d/grades", student.getGrades);

Deno.serve(app.fetch);