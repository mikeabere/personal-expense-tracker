const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

const getHeaders = (token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const fetchExpenses = async (token) => {
  const response = await fetch(`${API_BASE}/expenses`, {
    headers: getHeaders(token),
  });
  return handleResponse(response);
};

export const saveExpense = async (expense, token) => {
  const response = await fetch(`${API_BASE}/expenses`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(expense),
  });
  return handleResponse(response);
};

export const editExpense = async (id, expense, token) => {
  const response = await fetch(`${API_BASE}/expenses/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(expense),
  });
  return handleResponse(response);
};

export const removeExpense = async (id, token) => {
  const response = await fetch(`${API_BASE}/expenses/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return handleResponse(response);
};
