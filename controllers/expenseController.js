import Expense from "../models/Expense.js";

export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

export const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
    }
    res.status(200).json(expense);
  } catch (error) {
    next(error);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date, description } = req.body;

    if (!title || amount === undefined || !category || !date) {
      res.status(400);
      throw new Error("Title, amount, category, and date are required");
    }

    const expense = new Expense({
      user: req.user._id,
      title,
      amount,
      category,
      date,
      description,
    });

    const createdExpense = await expense.save();
    res.status(201).json(createdExpense);
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date, description } = req.body;
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });

    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
    }

    expense.title = title ?? expense.title;
    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.date = date ?? expense.date;
    expense.description = description ?? expense.description;

    const updatedExpense = await expense.save();
    res.status(200).json(updatedExpense);
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
    }

    await Expense.findByIdAndDelete(expense._id); //added this instead of expense.remove() to avoid deprecation warning
    res.json({ message: "Expense removed" });
  } catch (error) {
    next(error);
  }
};

export const exportExpensesCSV = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });

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
    const filename = `expenses_${new Date().toISOString().slice(0, 10)}.csv`;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
