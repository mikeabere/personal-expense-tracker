import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseSummary({ summary, expenses = [] }) {
  const labels = Object.keys(summary.counts || {});
  const dataValues = labels.map((l) => summary.counts[l] || 0);

  const colors = [
    "#4dc9f6",
    "#f67019",
    "#f53794",
    "#537bc4",
    "#acc236",
    "#166a8f",
    "#00a950",
    "#58595b",
    "#8549ba",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
        hoverOffset: 6,
      },
    ],
  };

  const exportCSV = () => {
    const headers = ["Title", "Category", "Amount", "Date", "Description"];
    const rows = expenses.map((e) => [
      (e.title || "").replace(/"/g, '""'),
      (e.category || "").replace(/"/g, '""'),
      Number(e.amount || 0),
      new Date(e.date).toISOString(),
      (e.description || "").replace(/"/g, '""'),
    ]);

    const csvLines = [headers.join(",")].concat(
      rows.map((r) => r.map((c) => (typeof c === "string" ? `"${c}"` : c)).join(","))
    );

    const csvContent = csvLines.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses_export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

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
      <div className="summary-card chart-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Category Breakdown</h3>
          <div>
            <button className="button-secondary" onClick={exportCSV}>
              Export CSV
            </button>
          </div>
        </div>
        {labels.length ? (
          <div style={{ maxWidth: 360 }}>
            <Pie data={chartData} />
          </div>
        ) : (
          <p>No category data yet.</p>
        )}
        <ul>
          {labels.map((category) => (
            <li key={category}>
              {category}: {summary.counts[category]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ExpenseSummary;
