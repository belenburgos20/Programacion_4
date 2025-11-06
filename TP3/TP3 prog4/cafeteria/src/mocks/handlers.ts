import { http, HttpResponse } from 'msw';
import type { Product } from '../types/product';

const menu: Product[] = [
  { id: '1', name: 'Café', price: 1200 },
  { id: '2', name: 'Té', price: 900 },
  { id: '3', name: 'Medialuna', price: 800 },
];

export const handlers = [
  // GET /api/menu
  http.get('/api/menu', () => {
    return HttpResponse.json(menu, { status: 200 });
  }),

  // POST /api/orders
  http.post('/api/orders', async ({ request }) => {
    // podrías validar el body con Zod si querés más adelante
    const body = await request.json().catch(() => ({}));
    return HttpResponse.json({ ok: true, id: 'order-123', received: body }, { status: 201 });
  }),
];