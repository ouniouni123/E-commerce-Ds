import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <Navbar expand="lg" className="shadow-sm py-3" bg="white">
      <Container>
        {/* LOGO + BRAND */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/logo.jpg" // 👈 EXACTLY THIS
            alt="Tech & Style Logo"
            style={{
              height: "40px",
              width: "40px",
              objectFit: "contain",
              marginRight: "10px",
            }}
          />
          <span
            className="fw-bold"
            style={{ fontSize: "1.25rem", letterSpacing: "1px" }}
          >
            Tech&Style
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          {/* LEFT NAVIGATION */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/shop">
              Shop
            </Nav.Link>
            <Nav.Link as={Link} to="/shop/tech">
              Tech
            </Nav.Link>
            <Nav.Link as={Link} to="/shop/fashion">
              Fashion
            </Nav.Link>
          </Nav>

          {/* RIGHT NAVIGATION */}
          <Nav>
            {!currentUser ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/account">
                  Account
                </Nav.Link>

                {currentUser.role === "admin" && (
                  <Nav.Link as={Link} to="/admin">
                    Admin
                  </Nav.Link>
                )}

                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            )}

            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
