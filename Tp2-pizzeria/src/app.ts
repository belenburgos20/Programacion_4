import express from 'express';

export function makeApp() {
  const app = express();
  app.use(express.json());

  //  rutas
  return app;
}
