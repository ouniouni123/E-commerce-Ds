import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { saveOrder } from "../utils/orderStorage";

const Checkout = ({ cart }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to place an order.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!form.fullName || !form.address || !form.city || !form.zip || !form.country) {
      alert("Please fill in all required shipping fields.");
      return;
    }

    setSubmitting(true);

    const order = {
      id: Date.now().toString(),
      userEmail: currentUser.email,
      customerName: form.fullName,
      shipping: {
        address: form.address,
        city: form.city,
        zip: form.zip,
        country: form.country,
        notes: form.notes,
      },
      items: cart,
      total,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    saveOrder(order);

    // Clear cart in localStorage (your App state will sync on reload)
    localStorage.setItem("cart", JSON.stringify([]));

    setSubmitting(false);

    // Go to account page so user sees their order
    navigate("/account");
  };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <h2>Checkout</h2>
          <p className="text-muted mb-0">
            Review your order and provide your shipping details to complete the purchase.
          </p>
        </Col>
      </Row>

      <Row className="gy-4">
        {/* SHIPPING FORM */}
        <Col md={7}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>Shipping information</Card.Title>

              <Form onSubmit={handlePlaceOrder}>
                <Form.Group className="mb-3">
                  <Form.Label>Full name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address*</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City*</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>ZIP / Postal code*</Form.Label>
                      <Form.Control
                        type="text"
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Country*</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Notes (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Building, floor, phone number, etc."
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="dark"
                  disabled={submitting || cart.length === 0}
                >
                  {submitting ? "Placing order..." : "Place order"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* ORDER SUMMARY */}
        <Col md={5}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>Order summary</Card.Title>

              {cart.length === 0 ? (
                <p className="text-muted mb-0">Your cart is currently empty.</p>
              ) : (
                <>
                  <ListGroup variant="flush" className="mb-3">
                    {cart.map((item, index) => (
                      <ListGroup.Item
                        key={`${item.id}-${index}`}
                        className="d-flex justify-content-between align-items-center px-0"
                      >
                        <div>
                          <div className="small fw-semibold">{item.name}</div>
                          <div className="small text-muted">${item.price}</div>
                        </div>
                        <div className="small">1x</div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <div className="d-flex justify-content-between mb-1 small text-muted">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1 small text-muted">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold mt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
