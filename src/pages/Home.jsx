import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import products from "../data/products.js";
import ProductCard from "../components/product/ProductCard.jsx";

const Home = ({ onAddToCart }) => {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <div className="hero-highlight mb-3">
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                <span className="ms-2">
                  New drop — curated tech & streetwear
                </span>
              </div>

              <h1 className="display-5 fw-bold mb-3">
                Tech that works.
                <br />
                Style that lasts.
              </h1>

              <p className="lead text-muted mb-4">
                A minimal store for people who love clean interfaces and
                carefully chosen gear — from laptops to hoodies.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Button as={Link} to="/shop" variant="dark">
                  Shop all products
                </Button>
                <Button as={Link} to="/shop/tech" variant="outline-dark">
                  Tech
                </Button>
                <Button as={Link} to="/shop/fashion" variant="outline-dark">
                  Fashion
                </Button>
              </div>
            </Col>

            <Col md={6}>
              <div className="hero-card p-4">
                <p className="small mb-3 text-uppercase text-muted">
                  Why Tech&Style
                </p>
                <div className="d-flex flex-column gap-2 small text-muted">
                  <div>• Curated products only — no random junk.</div>
                  <div>• Clean, distraction-free interface.</div>
                  <div>• Demo accounts to test auth & checkout.</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-4">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="fs-4 mb-1">Featured picks</h2>
              <p className="small text-muted mb-0">
                A quick taste of our best tech and fashion pieces.
              </p>
            </div>
            <Button
              as={Link}
              to="/shop"
              variant="link"
              className="p-0 text-decoration-none"
            >
              View all →
            </Button>
          </div>

          <Row className="g-3">
            {featured.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
