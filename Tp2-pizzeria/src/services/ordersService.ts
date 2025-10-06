import { OrderInput } from '../models/order';


export const ordersService = {
  createOrder: (orderData: OrderInput) => {
  const basePrecios = {
    S: 10000,
    M: 14500,
    L: 18000,
  };

  const base = basePrecios[orderData.size];
  const precio = base + orderData.toppings.length * 1500;

  return {
    size: orderData.size,
    toppings: orderData.toppings,
    status: 'pending',
    precio,
  };
},

};

