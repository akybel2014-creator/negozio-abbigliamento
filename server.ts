import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { matterhornRouter } from './server/routes/matterhornRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());

// Backend Routes
app.use('/api/matterhorn', matterhornRouter);

// Backwards-compatible legacy route pointing to matterhorn router
app.post('/api/import-matterhorn', (req: Request, res: Response, next) => {
  req.url = '/import';
  matterhornRouter(req, res, next);
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    server: 'Matterhorn Moda B2B Backend',
    serverTime: new Date().toISOString() 
  });
});

// Vite middleware in dev or static files in prod
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Running on http://0.0.0.0:${PORT}`);
  });
}

start();
