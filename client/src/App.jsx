import { useEffect, useMemo, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import { fetchExpenses, saveExpense, removeExpense, editExpense } from "./api/expenseApi";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchExpenses();
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
        await editExpense(editingExpense._id, expenseData);
        setEditingExpense(null);
      } else {
        await saveExpense(expenseData);
      }
      await loadExpenses();
    } catch (err) {
      setError(err.message || "Unable to save expense.");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await removeExpense(id);
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

  return (
    <div className="app-shell">
      <header>
        <h1>Personal Expense Tracker</h1>
        <p>Track your spending, sort by category, and review your monthly summary.</p>
      </header>

      <main>
        <section className="panel">
          <ExpenseForm onSave={handleSave} editingExpense={editingExpense} onCancel={() => setEditingExpense(null)} />
        </section>

        <section className="panel summary-panel">
          <ExpenseSummary summary={summary} />
        </section>

        <section className="panel list-panel">
          {error && <div className="error-message">{error}</div>}
          <ExpenseList
            expenses={expenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
            loading={loading}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
