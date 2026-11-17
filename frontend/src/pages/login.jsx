import { useState } from "react";
import { Link } from "react-router";

const API_URL = "https://hosting-0w8v.onrender.com";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      setResult(
        `${response.ok ? "Success" : "Failed"} (${response.status})\n` +
          JSON.stringify(data, null, 2)
      );

      setForm((previous) => ({ ...previous, password: "" }));
    } catch (error) {
      setResult(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Login</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            className="auth-input"
            name="email"
            type="email"
            autoComplete="username"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            className="auth-input"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        {result && (
          <pre className="auth-result" role="status">
            {result}
          </pre>
        )}
      </section>
    </main>
  );
}