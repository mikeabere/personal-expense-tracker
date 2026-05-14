import Expense from "../models/Expense.js";

export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

export const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
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
    const expense = await Expense.findById(req.params.id);

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
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
    }

    await expense.remove();
    res.json({ message: "Expense removed" });
  } catch (error) {
    next(error);
  }
};
