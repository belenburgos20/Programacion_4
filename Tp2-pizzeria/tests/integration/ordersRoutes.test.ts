import request from 'supertest';
import { makeApp } from '../../src/app';

describe('orders routes', () => {
  const app = makeApp();

  test('POST /orders debería responder con status 200', async () => {
    const response = await request(app).post('/orders').send({});
    expect(response.status).toBeDefined(); // test dummy
  });
});
//Acá van a ir las rutas del endpoint /orders.