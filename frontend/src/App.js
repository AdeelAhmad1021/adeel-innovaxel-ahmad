import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  InputGroup,
} from "react-bootstrap";

function App() {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [updateUrl, setUpdateUrl] = useState("");
  const [stats, setStats] = useState(null);

  const apiBase = "http://localhost:5000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStats(null);

    try {
      const res = await axios.post(`${apiBase}/shorten`, { url });
      setShortCode(res.data.shortCode);
      setResult(res.data);
    } catch {
      setError("Failed to shorten URL.");
    }
  };

  const handleGetOriginal = async () => {
    try {
      const res = await axios.get(`${apiBase}/shorten/${shortCode}`);
      setResult(res.data);
    } catch {
      setError("Short URL not found.");
    }
  };

  const handleGetStats = async () => {
    try {
      const res = await axios.get(`${apiBase}/shorten/${shortCode}/stats`);
      setStats(res.data);
    } catch {
      setError("Failed to fetch stats.");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${apiBase}/shorten/${shortCode}`, {
        url: updateUrl,
      });
      setResult(res.data);
      setError("");
    } catch {
      setError("Failed to update the URL.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiBase}/shorten/${shortCode}`);
      setResult(null);
      setStats(null);
      setError("");
      alert("Short URL deleted!");
    } catch {
      setError("Failed to delete the URL.");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center mb-4">🔗 URL Shortener</h3>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Long URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Generate Short URL
                </Button>
              </Form>

              {shortCode && (
                <div className="mt-4">
                  <Alert variant="success" className="text-center">
                    Short URL:{" "}
                    <a
                      href={`${apiBase}/shorten/${shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {`${apiBase}/shorten/${shortCode}`}
                    </a>
                  </Alert>

                  <div className="d-grid gap-2">
                    <Button variant="secondary" onClick={handleGetOriginal}>
                      🔍 Get Original URL
                    </Button>
                    <Button variant="info" onClick={handleGetStats}>
                      📊 View Stats
                    </Button>

                    <InputGroup className="mt-2">
                      <Form.Control
                        placeholder="New URL to update"
                        value={updateUrl}
                        onChange={(e) => setUpdateUrl(e.target.value)}
                      />
                      <Button variant="warning" onClick={handleUpdate}>
                        ✏️ Update URL
                      </Button>
                    </InputGroup>

                    <Button
                      variant="danger"
                      className="mt-2"
                      onClick={handleDelete}
                    >
                      ❌ Delete Short URL
                    </Button>
                  </div>
                </div>
              )}

              {result && (
                <div className="mt-4">
                  <h6>🔁 Current Record:</h6>
                  <pre className="bg-light p-3 rounded">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}

              {stats && (
                <div className="mt-4">
                  <h6>📊 Access Stats:</h6>
                  <pre className="bg-light p-3 rounded">
                    {JSON.stringify(stats, null, 2)}
                  </pre>
                </div>
              )}

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
