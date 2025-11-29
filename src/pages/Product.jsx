import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import products from '../data/products.js';

const Product = ({ onAddToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <Container className="py-5">
        <p className="mb-3">Product not found.</p>
        <Button as={Link} to="/shop" variant="dark">
          Back to Shop
        </Button>
      </Container>
    );
  }

  const { name, price, image, description, inStock, rating, reviews, category, specs } =
    product;

  const handleAdd = () => {
    onAddToCart(product);
  };

  return (
    <section className="py-4">
      <Container>
        <Row className="g-4">
          <Col md={6}>
            <div className="ratio ratio-4x3 rounded-4 overflow-hidden bg-white shadow-sm">
              <img
                src={image}
                alt={name}
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h1 className="fs-3 mb-0">{name}</h1>
              <Badge bg={category === 'tech' ? 'primary' : 'secondary'}>
                {category === 'tech' ? 'Tech' : 'Fashion'}
              </Badge>
            </div>
            <div className="text-muted small mb-2">
              ⭐ {rating.toFixed(1)} · {reviews} reviews
            </div>
            <div className="fs-2 fw-bold mb-3">${price}</div>
            <p className="text-muted mb-3">{description}</p>
            <div className="mb-3">
              {inStock ? (
                <span className="text-success small fw-semibold">
                  In stock · Ships in 2–3 days
                </span>
              ) : (
                <span className="text-danger small fw-semibold">
                  Out of stock
                </span>
              )}
            </div>

            <div className="d-flex flex-wrap gap-2 mb-4">
              <Button
                variant="dark"
                onClick={handleAdd}
                disabled={!inStock}
              >
                {inStock ? 'Add to Cart' : 'Unavailable'}
              </Button>
              <Button as={Link} to="/shop" variant="outline-secondary">
                Back to Shop
              </Button>
            </div>

            <div>
              <h2 className="fs-5 mb-2">Details</h2>
              <ul className="list-unstyled small text-muted">
                {Object.entries(specs).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Product;
