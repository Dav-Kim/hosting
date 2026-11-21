import { useState } from "react";
import { API_URL } from "../api.js";



function AuthTest() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSignupChange(event) {
    const { name, value } = event.target;

    setSignupData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleLoginChange(event) {
    const { name, value } = event.target;

    setLoginData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function sendRequest(endpoint, data) {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const responseText = await response.text();

      let responseData;

      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }

      if (!response.ok) {
        setResult()(
          `❌ Request failed (${response.status})\n\n${JSON.stringify(
            responseData,
            null,
            2
          )}`
        );
        return;
      }

      setResult(
        `✅ Success (${response.status})\n\n${JSON.stringify(
          responseData,
          null,
          2
        )}`
      );
    } catch (error) {
      setResult(`❌ Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleSignup(event) {
    event.preventDefault();
    sendRequest(`${API_URL}/auth/signup`, signupData);
  }

  function handleLogin(event) {
    event.preventDefault();
    sendRequest(`${API_URL}/auth/login`, loginData);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Backend Authentication Test</h1>

        <form className="auth-form" onSubmit={handleSignup}>
          <h2 className="auth-heading">Sign Up</h2>

          <input
            className="auth-input"
            type="text"
            name="name"
            placeholder="Name"
            value={signupData.name}
            onChange={handleSignupChange}
            required
          />

          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleSignupChange}
            required
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignupChange}
            required
          />

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Sign Up"}
          </button>
        </form>

        <form className="auth-form" onSubmit={handleLogin}>
          <h2 className="auth-heading">Login</h2>

          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Login"}
          </button>
        </form>

        {result && <pre className="auth-result">{result}</pre>}
      </section>
    </main>
  );
}

export default AuthTest;