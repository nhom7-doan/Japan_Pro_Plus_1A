import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/student.js';

const app = new Hono();

app.use('*', logger());

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
}));

app.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'Backend server is running' });
});

app.route('/api/auth', authRoutes);
app.route('/api/student', studentRoutes);

const port = process.env.PORT || 3000;

console.log(`🚀 Backend server starting on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
