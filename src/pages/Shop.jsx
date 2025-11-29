import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import productsData from "../data/products";
import ProductCard from "../components/product/ProductCard";

const Shop = ({ onAddToCart }) => {
  const { category } = useParams();
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("none");

  // START WITH ALL PRODUCTS
  let filtered = [...productsData];

  // CATEGORY FILTER
  if (category === "tech") filtered = filtered.filter((p) => p.category === "tech");
  if (category === "fashion") filtered = filtered.filter((p) => p.category === "fashion");

  // SEARCH
  filtered = filtered.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // SORTING
  if (sortType === "priceLow") filtered.sort((a, b) => a.price - b.price);
  if (sortType === "priceHigh") filtered.sort((a, b) => b.price - a.price);
  if (sortType === "rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sortType === "featured") filtered.sort((a, b) => (b.featured ? -1 : 1));

  return (
    <Container className="py-4">

      <h2 className="mb-3">
        {category === "tech" && "Technology Products"}
        {category === "fashion" && "Fashion Products"}
        {!category && "All Products"}
      </h2>

      {/* SEARCH AND SORT */}
      <Row className="mb-3">
        <Col md={6}>
          <input
            className="form-control search-bar"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={6}>
          <select
            className="form-select search-bar"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="none">Sort by...</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="rating">Rating</option>
            <option value="featured">Featured</option>
          </select>
        </Col>
      </Row>

      {/* PRODUCT GRID */}
      <Row className="g-3">
        {filtered.map((p) => (
          <Col key={p.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={p} onAddToCart={onAddToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Shop;
