import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import categories from "../utils/categories";

import {
    getExpenses,
    deleteExpense,
    filterExpenses
} from "../services/expenseService";

function ExpenseList() {

    const [expenses, setExpenses] = useState([]);

    const [filter, setFilter] = useState({
        category: "",
        startDate: "",
        endDate: "",
        minAmount: "",
        maxAmount: ""
    });

    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses = async () => {

        try {

            const response = await getExpenses();

            setExpenses(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        });

    };

    const applyFilter = async () => {

        try {

            const response = await filterExpenses(filter);

            setExpenses(response.data);

        } catch (err) {

            console.log(err);

            alert("Unable to filter expenses.");

        }

    };

    const resetFilter = () => {

        setFilter({
            category: "",
            startDate: "",
            endDate: "",
            minAmount: "",
            maxAmount: ""
        });

        loadExpenses();

    };

    const removeExpense = async (id) => {

        if (!window.confirm("Delete this expense?"))
            return;

        await deleteExpense(id);

        loadExpenses();

    };

    return (

        <Layout>

            <div className="container-fluid">

                <div className="card shadow border-0 mb-4">

                    <div className="card-body">

                        <h2 className="fw-bold mb-4">
                            💰 Expense Manager
                        </h2>

                        <div className="row g-3">

                            <div className="col-md-2">

                               <select
    className="form-select"
    name="category"
    value={filter.category}
    onChange={handleChange}
>
    <option value="">All Categories</option>

    {categories.map(category => (
        <option
            key={category}
            value={category}
        >
            {category}
        </option>
    ))}
</select>

                            </div>

                            <div className="col-md-2">

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Min Amount"
                                    name="minAmount"
                                    value={filter.minAmount}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-2">

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Max Amount"
                                    name="maxAmount"
                                    value={filter.maxAmount}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-2">

                                <input
                                    type="date"
                                    className="form-control"
                                    name="startDate"
                                    value={filter.startDate}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-2">

                                <input
                                    type="date"
                                    className="form-control"
                                    name="endDate"
                                    value={filter.endDate}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-2 d-grid">

                                <button
                                    className="btn btn-primary"
                                    onClick={applyFilter}
                                >
                                    🔍 Filter
                                </button>

                            </div>

                            <div className="col-md-12 text-end">

                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={resetFilter}
                                >
                                    Reset Filters
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow border-0">

                    <div className="card-body">

                        <h4 className="mb-3">

                            Total Records :
                            <span className="text-primary">
                                {" "}{expenses.length}
                            </span>

                        </h4>

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>

                                        <th>Amount</th>

                                        <th>Category</th>

                                        <th>Description</th>

                                        <th>Date</th>

                                        <th width="150">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        expenses.length === 0 ?

                                            <tr>

                                                <td
                                                    colSpan="6"
                                                    className="text-center text-muted py-4"
                                                >
                                                    No Expenses Found
                                                </td>

                                            </tr>

                                            :

                                            expenses.map(expense => (

                                                <tr key={expense.id}>

                                                    <td>{expense.id}</td>

                                                    <td className="fw-bold text-success">
                                                        ₹{expense.amount}
                                                    </td>

                                                    <td>

                                                        <span className="badge bg-primary">

                                                            {expense.category}

                                                        </span>

                                                    </td>

                                                    <td>
                                                        {expense.description}
                                                    </td>

                                                    <td>
                                                        {expense.expenseDate}
                                                    </td>

                                                    <td>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => removeExpense(expense.id)}
                                                        >
                                                            Delete
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default ExpenseList;