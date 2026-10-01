import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { apiRouter } from './server/routes.ts';
import { initDefaultUsers } from './server/auth.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_PATH = '/hopelandestates';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  // Seed default users and sample data
  initDefaultUsers();

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // REST API routes mounted under both /api and /hopelandestates/api
  app.use('/api', apiRouter);
  app.use(`${BASE_PATH}/api`, apiRouter);

  if (!isProduction) {
    // Development mode: Vite dev server with middleware mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });

    // Support both root (/) in Google AI Studio preview and /hopelandestates/ base path seamlessly
    app.use((req, _res, next) => {
      if (
        !req.url.startsWith('/api') &&
        !req.url.startsWith(BASE_PATH)
      ) {
        req.url = `${BASE_PATH}${req.url.startsWith('/') ? req.url : '/' + req.url}`;
      }
      next();
    });

    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built client files at both /hopelandestates and /
    const distPath = path.resolve(__dirname, 'dist');
    app.use(BASE_PATH, express.static(distPath));
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Hopeland Server] Server running on http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode.`);
  });
}

startServer().catch(err => {
  console.error('[Hopeland Server] Failed to start server:', err);
  process.exit(1);
});
