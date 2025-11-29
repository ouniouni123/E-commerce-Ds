import React from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = ({ cart, onRemoveItem, onUpdateQuantity }) => {
  const hasItems = cart.length > 0;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.19;
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + tax + shipping;

  return (
    <section className="py-4">
      <Container>
        <h1 className="fs-3 mb-3">Shopping Cart</h1>

        {!hasItems ? (
          <div className="text-center text-muted py-5">
            <p>Your cart is empty.</p>
            <Button as={Link} to="/shop" variant="dark">
              Start shopping
            </Button>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <Table responsive="sm" hover className="align-middle bg-white shadow-sm">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '56px',
                              height: '56px',
                              objectFit: 'cover',
                              borderRadius: '0.5rem',
                            }}
                          />
                          <div>
                            <div className="small fw-semibold">{item.name}</div>
                            <div className="small text-muted text-capitalize">
                              {item.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center small">${item.price}</td>
                      <td className="text-center">
                        <Form.Control
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            onUpdateQuantity(item.id, Number(e.target.value))
                          }
                          style={{ maxWidth: '80px', margin: '0 auto' }}
                        />
                      </td>
                      <td className="text-end small">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="text-end">
                        <Button
                          variant="link"
                          size="sm"
                          className="text-danger"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="col-lg-4">
              <div className="border rounded-4 p-3 bg-white shadow-sm">
                <h2 className="fs-5 mb-3">Order Summary</h2>
                <div className="d-flex justify-content-between small mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between small mb-2">
                  <span>Tax (19%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between small mb-2">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-semibold mb-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button
                  as={Link}
                  to="/checkout"
                  variant="dark"
                  className="w-100 mb-2"
                >
                  Proceed to checkout
                </Button>
                <Button
                  as={Link}
                  to="/shop"
                  variant="outline-secondary"
                  className="w-100"
                  size="sm"
                >
                  Continue shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Cart;
