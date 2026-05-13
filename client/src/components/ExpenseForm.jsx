import { useEffect, useState } from "react";

const defaultForm = {
  title: "",
  amount: "",
  category: "",
  date: "",
  description: "",
};

const categories = ["Food", "Transport", "Bills", "Shopping", "Health", "Other"];

function ExpenseForm({ onSave, editingExpense, onCancel }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date.slice(0, 10),
        description: editingExpense.description || "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingExpense]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      description: form.description.trim(),
    });
    setForm(defaultForm);
  };

  return (
    <div>
      <h2>{editingExpense ? "Edit Expense" : "Add New Expense"}</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Amount
          <input
            name="amount"
            type="number"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Choose category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </label>
        <label style={{ gridColumn: "1 / -1" }}>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", gridColumn: "1 / -1" }}>
          <button type="submit" className="button-primary">
            {editingExpense ? "Update Expense" : "Save Expense"}
          </button>
          {editingExpense && (
            <button type="button" onClick={onCancel} className="button-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
