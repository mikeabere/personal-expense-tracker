# Personal Expense Tracker (MERN)

A full-stack MERN application for tracking your expenses, categorizing spending, and viewing summary metrics.

## Project Overview

- **Backend:** Node.js + Express + MongoDB using Mongoose
- **Frontend:** React with Vite
- **Features:** add, edit, delete expenses, category breakdown, summary cards, responsive UI

## Architecture

- `index.js` - Backend server entrypoint
- `config/db.js` - MongoDB connection helper
- `models/Expense.js` - Mongoose expense schema
- `models/User.js` - Mongoose user schema
- `controllers/expenseController.js` - CRUD expense logic
- `controllers/authController.js` - CRUD user logic
- `routes/expenseRoutes.js` - API expense endpoints
- `routes/authRoutes.js` - API auth endpoints
- `middleware/errorMiddleware.js` - error handling
- `middleware/authMiddleware.js` - auth handling
- `client/` - React application
- `client/src/api/expenseApi.js` - fetch wrapper for expense backend API
- `client/src/api/authApi.js` - fetch wrapper for auth backend API
- `client/src/components/` - UI components

## Implementation Plan

### Backend

1. Install dependencies:
   - `express`, `mongoose`, `cors`, `dotenv`, `morgan`, `bcryptjs`
2. Configure MongoDB connection in `config/db.js`
3. Create `Expense` model with fields:
   - `title`, `amount`, `category`, `description`, `date`
4. Build REST API endpoints:
   - `GET /api/expenses`
   - `POST /api/expenses`
   - `GET /api/expenses/:id`
   - `PUT /api/expenses/:id`
   - `DELETE /api/expenses/:id`
5. Add request parsing, logging, CORS support, and error middleware

### Frontend

1. Initialize React app with Vite in `client/`
2. Build reusable UI components:
   - `ExpenseForm` for add/edit
   - `ExpenseList` to display expenses
   - `ExpenseSummary` to show totals and category breakdown
3. Add API helper functions in `client/src/api/expenseApi.js`
4. Connect UI to backend with fetch requests
5. Add responsive styling and form validation

## Setup Instructions

### Backend

1. Copy `.env.example` to `.env`
2. Set your MongoDB connection string:

```env
MONGO_URL=mongodb://127.0.0.1:27017/expense-tracker
PORT=7000
NODE_ENV=development
```

3. Install backend dependencies:

```bash
npm install
```

4. Start the backend server:

```bash
npm run dev
```

### Frontend

1. Change into the client folder:

```bash
cd client
```

2. Install frontend dependencies:

```bash
npm install
```

3. Copy `client/.env.example` to `client/.env` if you want to override the API URL

4. Start the React app:

```bash
npm run dev
```

## Usage

- Open the React app at `http://localhost:5173`
- Add expense entries
- Edit or delete existing expenses
- Review total spend, average expense, and category counts

## Notes

- The backend API is exposed at `http://localhost:7000/api/expenses`
- The frontend uses Vite and a simple fetch-based service layer
- You can deploy the backend anywhere with MongoDB Atlas or a local MongoDB instance

## Future Enhancements

- Add authentication - done - but will add more user roles
- Add monthly filtering - not done 
- Add charts and exports - done
- Add dark mode - not yet
- Add payment intergration - M-pesa and bank payment - not done
