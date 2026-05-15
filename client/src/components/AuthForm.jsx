import { useState } from "react";

const defaultCredentials = {
  name: "",
  email: "",
  password: "",
};

function AuthForm({ mode, onSubmit, onModeChange, error }) {
  const [credentials, setCredentials] = useState(defaultCredentials);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: credentials.email.trim(),
      password: credentials.password,
    };

    if (mode === "register") {
      payload.name = credentials.name.trim();
    }

    onSubmit(payload);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h2>{mode === "login" ? "Login" : "Create account"}</h2>
        <p>{mode === "login" ? "Sign in to manage your expenses." : "Register to keep your expenses private."}</p>
        {error && <div className="error-message">{error}</div>}
        <form className="form-grid" onSubmit={handleSubmit}>
          {mode === "register" && (
            <label>
              Name
              <input
                name="name"
                value={credentials.name}
                onChange={handleChange}
                required
              />
            </label>
          )}
          <label>
            Email
            <input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </label>
          <button type="submit" className="button-primary">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
        <button type="button" className="button-secondary" onClick={onModeChange}>
          {mode === "login" ? "Create a new account" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
