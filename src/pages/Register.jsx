import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      await register(form);
      navigate('/account');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-4">
      <Container style={{ maxWidth: '480px' }}>
        <h1 className="fs-3 mb-3">Create account</h1>

        {error && (
          <Alert variant="danger" className="small">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

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
            {submitting ? 'Creating account…' : 'Register'}
          </Button>
        </Form>

        <p className="small text-muted mb-0">
          Already have an account? <Link to="/login">Login</Link>.
        </p>
      </Container>
    </section>
  );
};

export default Register;
