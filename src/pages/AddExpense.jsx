import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { addExpense } from "../services/expenseService";
import categories from "../utils/categories";

function AddExpense() {

    const navigate = useNavigate();

    const [expense, setExpense] = useState({
        amount: "",
        category: "",
        description: "",
        expenseDate: ""
    });

    const handleChange = (e) => {

        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const result = await addExpense(expense);

            alert(result?.exceededBudget ? result.message : "Expense Added Successfully");

            navigate("/expenses");

        } catch (error) {

            alert("Failed to add expense");

        }

    };

    return (

        <Layout>

            <div className="container">

                <div className="card p-4">

                    <h2 className="mb-4 fw-bold">
                        ➕ Add New Expense
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                className="form-control"
                                value={expense.amount}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <select
    className="form-select mb-3"
    name="category"
    value={expense.category}
    onChange={handleChange}
    required
>
    <option value="">Select Category</option>

    {categories.map(category => (
        <option
            key={category}
            value={category}
        >
            {category}
        </option>
    ))}
</select>

                        <div className="mb-3">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                name="description"
                                value={expense.description}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Expense Date
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="expenseDate"
                                value={expense.expenseDate}
                                onChange={handleChange}
                            />

                        </div>

                        <button className="btn btn-success px-4">
                            Save Expense
                        </button>

                    </form>

                </div>

            </div>

        </Layout>

    );

}

export default AddExpense;