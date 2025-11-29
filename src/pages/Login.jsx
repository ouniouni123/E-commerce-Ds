import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/account';

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (type) => {
    if (type === 'admin') {
      setForm({ email: 'admin@store.com', password: 'admin123' });
    } else {
      setForm({ email: 'user@store.com', password: 'user123' });
    }
  };

  return (
    <section className="py-4">
      <Container style={{ maxWidth: '480px' }}>
        <h1 className="fs-3 mb-3">Login</h1>

        {error && (
          <Alert variant="danger" className="small">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            variant="dark"
            className="w-100 mb-3"
            disabled={submitting}
          >
            {submitting ? 'Signing in…' : 'Login'}
          </Button>
        </Form>

        <div className="d-flex justify-content-between">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => fillDemo('user')}
          >
            Demo user
          </Button>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => fillDemo('admin')}
          >
            Demo admin
          </Button>
        </div>

        <p className="small text-muted mt-3 mb-0">
          No account yet? <Link to="/register">Register here</Link>.
        </p>
      </Container>
    </section>
  );
};

export default Login;
