import React, { useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import productsData from "../data/products";

const Admin = () => {
  const [products, setProducts] = useState(productsData);
  const [editing, setEditing] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered =
    categoryFilter === "all"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  return (
    <Container className="py-4">

      <h2 className="mb-3">Admin Dashboard</h2>

      {/* CATEGORY FILTER */}
      <div className="d-flex gap-2 mb-3">
        <Button
          variant={categoryFilter === "all" ? "dark" : "outline-dark"}
          onClick={() => setCategoryFilter("all")}
        >
          All
        </Button>
        <Button
          variant={categoryFilter === "tech" ? "dark" : "outline-dark"}
          onClick={() => setCategoryFilter("tech")}
        >
          Tech
        </Button>
        <Button
          variant={categoryFilter === "fashion" ? "dark" : "outline-dark"}
          onClick={() => setCategoryFilter("fashion")}
        >
          Fashion
        </Button>
      </div>

      {/* PRODUCT TABLE */}
      <Table hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Featured</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.inStock ? "Yes" : "No"}</td>
              <td>{p.featured ? "⭐" : "-"}</td>
              <td>
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => setEditing(p)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* EDIT FORM */}
      {editing && (
        <div className="p-3 border rounded bg-white mt-4">

          <h5>Edit Product #{editing.id}</h5>

          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={editing.price}
              onChange={(e) =>
                setEditing({ ...editing, price: Number(e.target.value) })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>In Stock</Form.Label>
            <Form.Select
              value={editing.inStock}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  inStock: e.target.value === "true",
                })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Form.Group>

          <Button
            variant="dark"
            className="mt-2"
            onClick={() => {
              setProducts((prev) =>
                prev.map((p) =>
                  p.id === editing.id ? editing : p
                )
              );
              setEditing(null);
            }}
          >
            Save
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Admin;
