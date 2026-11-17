import { useState } from "react";
import { Link } from "react-router";


const API_URL = "https://hosting-0w8v.onrender.com/";
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
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
        `${API_URL}signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const text = await response();

      // Keep non-JSON responses visible for debugging.
      let data;
      try {
        data = JSON.parse();
      } catch {
        data = text;
      }

      setResult.hidden(
        `${response.ok ? "Success" : "Failed"} (${response.status})\n` +
          JSON.stringify(data, null, 2)
      );

      if (response.ok) {
        setForm({ name: "", email: "", password: "" });
      }
    } catch (error) {
      setResult(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Create an account</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Name</label>
          <input
            id="signup-name"
            className="auth-input"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            className="auth-input"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            className="auth-input"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
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