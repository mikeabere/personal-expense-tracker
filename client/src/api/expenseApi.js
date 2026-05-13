const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

export const fetchExpenses = async () => {
  const response = await fetch(`${API_BASE}/expenses`);
  return handleResponse(response);
};

export const saveExpense = async (expense) => {
  const response = await fetch(`${API_BASE}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return handleResponse(response);
};

export const editExpense = async (id, expense) => {
  const response = await fetch(`${API_BASE}/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return handleResponse(response);
};

export const removeExpense = async (id) => {
  const response = await fetch(`${API_BASE}/expenses/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
