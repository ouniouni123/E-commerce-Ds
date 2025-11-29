import React from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { getAllOrders } from "../utils/orderStorage";

const Account = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Container className="py-4">
        <h2>Account</h2>
        <p>You need to be logged in to view your account.</p>
      </Container>
    );
  }

  const allOrders = getAllOrders();
  const myOrders = allOrders.filter(
    (o) => o.userEmail === currentUser.email
  );

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Account details</Card.Title>
              <p className="mb-1"><strong>Name:</strong> {currentUser.name}</p>
              <p className="mb-1"><strong>Email:</strong> {currentUser.email}</p>
              {currentUser.role && (
                <p className="mb-0">
                  <strong>Role:</strong> {currentUser.role}
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4>Your orders</h4>
          {myOrders.length === 0 ? (
            <p className="text-muted">You have not placed any orders yet.</p>
          ) : (
            <Card className="shadow-sm">
              <Card.Body>
                <Table hover responsive size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myOrders.map((order, index) => (
                      <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>{order.items.length}</td>
                        <td>${order.total}</td>
                        <td>
                          <Badge bg="secondary">{order.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
