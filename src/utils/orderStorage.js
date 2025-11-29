// Simple helpers to store orders in localStorage

const ORDERS_KEY = "orders";

export const getAllOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveOrder = (order) => {
  const orders = getAllOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};
