function ExpenseList({ expenses, onEdit, onDelete, loading }) {
  if (loading) {
    return <p>Loading expenses...</p>;
  }

  if (!expenses.length) {
    return <p>No expenses found. Add your first expense above.</p>;
  }

  return (
    <div>
      <h2>Expense History</h2>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.title}</td>
              <td>{expense.category}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.description || "–"}</td>
              <td className="actions">
                <button className="button-secondary" onClick={() => onEdit(expense)}>
                  Edit
                </button>
                <button className="button-primary" onClick={() => onDelete(expense._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
