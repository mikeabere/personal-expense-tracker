function ExpenseSummary({ summary }) {
  return (
    <>
      <div className="summary-card">
        <h3>Total Spent</h3>
        <p>${summary.total.toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3>Average Expense</h3>
        <p>${summary.average.toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3>Category Breakdown</h3>
        <ul>
          {Object.entries(summary.counts).map(([category, count]) => (
            <li key={category}>
              {category}: {count}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ExpenseSummary;
