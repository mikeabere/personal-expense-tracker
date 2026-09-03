import { useEffect, useMemo, useState } from "react";
// Importing components
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import AuthForm from "./components/AuthForm";
import { fetchExpenses, saveExpense, removeExpense, editExpense } from "./api/expenseApi";
import { loginUser, registerUser } from "./api/authApi";
import "./App.css";






function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(() => {
    const stored = window.localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => window.localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      loadExpenses();
    }
  }, [token]);

  const saveAuthData = (data) => {
    setUser({ _id: data._id, name: data.name, email: data.email });
    setToken(data.token);
    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem(
      "user",
      JSON.stringify({ _id: data._id, name: data.name, email: data.email })
    );
    setAuthError("");
  };

  const clearAuthData = () => {
    setUser(null);
    setToken("");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    setExpenses([]);
    setEditingExpense(null);
  };

  const handleAuth = async (payload) => {
    setAuthError("");
    try {
      const data = authMode === "login" ? await loginUser(payload) : await registerUser(payload);
      saveAuthData(data);
    } catch (err) {
      setAuthError(err.message || "Authentication failed.");
    }
  };

  const handleModeChange = () => {
    setAuthMode((prev) => (prev === "login" ? "register" : "login"));
    setAuthError("");
  };

  const loadExpenses = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchExpenses(token);
      setExpenses(data);
    } catch (err) {
      setError(err.message || "Unable to load expenses.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (expenseData) => {
    setError("");
    try {
      if (editingExpense) {
        await editExpense(editingExpense._id, expenseData, token);
        setEditingExpense(null);
      } else {
        await saveExpense(expenseData, token);
      }
      await loadExpenses();
    } catch (err) {
      setError(err.message || "Unable to save expense.");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await removeExpense(id, token);
      await loadExpenses();
    } catch (err) {
      setError(err.message || "Unable to delete expense.");
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const summary = useMemo(() => {
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    const average = expenses.length ? total / expenses.length : 0;
    const counts = expenses.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
    return { total, average, counts };
  }, [expenses]);

  if (!token) {
    return (
      <div className="app-shell">
        <AuthForm mode={authMode} onSubmit={handleAuth} onModeChange={handleModeChange} error={authError} />
      </div>
    );
  }

  return (
  
    <div className="app-shell">
      <header>
        <div className="header-top">
          <h1>Personal Expense Tracker</h1>
          <div className="header-actions">
            <p>Signed in as <strong>{user?.name}</strong></p>
            <button className="button-secondary" onClick={clearAuthData}>
              Logout
            </button>
          </div>
        </div>
        <p>Track your spending, sort by category, and review your monthly summary.</p>
      </header>

      <main>
        <section className="panel">
          <ExpenseForm onSave={handleSave} editingExpense={editingExpense} onCancel={() => setEditingExpense(null)} />
        </section>

        <section className="panel summary-panel">
          <ExpenseSummary summary={summary} expenses={expenses} />
        </section>

        <section className="panel list-panel">
          {error && <div className="error-message">{error}</div>}
          <ExpenseList expenses={expenses} onDelete={handleDelete} onEdit={handleEdit} loading={loading} />
        </section>
      </main>
    </div>
    
  );
}

export default App;
