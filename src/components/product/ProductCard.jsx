import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const {
    id,
    name,
    price,
    image,
    inStock,
    rating,
    reviews,
    featured,
    isNew,
    discount,
  } = product;

  return (
    <Card className="product-card h-100 shadow-sm border-0">

      {/* IMAGE WRAPPER */}
      <div className="product-image-wrapper">

        {/* FEATURED BADGE */}
        {featured && <span className="badge-featured">Featured</span>}

        {/* NEW BADGE */}
        {isNew && <span className="badge-new">New</span>}

        {/* SALE BADGE */}
        {discount && (
          <span className="badge-sale">-{discount}%</span>
        )}

        <Link to={`/product/${id}`}>
          <img src={image} alt={name} className="product-image" />
        </Link>
      </div>

      {/* BODY */}
      <Card.Body className="d-flex flex-column">

        {/* TITLE */}
        <Card.Title className="fs-6 fw-semibold mb-1">
          {name}
        </Card.Title>

        {/* RATING */}
        <div className="text-muted small mb-2">
          ★ {rating} · {reviews} reviews
        </div>

        {/* PRICE */}
        <div className="fw-bold mb-2">${price}</div>

        {/* STOCK INFO */}
        {!inStock && (
          <div className="text-danger small mb-2">Out of stock</div>
        )}

        {/* BUTTONS */}
        <div className="mt-auto d-flex gap-2">
          <Button
            variant="dark"
            size="sm"
            className="flex-grow-1"
            disabled={!inStock}
            onClick={() => onAddToCart(product)}
          >
            {inStock ? "Add to Cart" : "Unavailable"}
          </Button>

          <Button
            as={Link}
            to={`/product/${id}`}
            size="sm"
            variant="outline-dark"
          >
            View
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
