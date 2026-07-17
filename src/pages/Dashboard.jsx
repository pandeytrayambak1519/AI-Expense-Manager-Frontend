import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseTable from "../components/ExpenseTable";

import { getExpenses } from "../services/expenseService";

function Dashboard() {

    const [expenses, setExpenses] = useState([]);

    // Temporary username until you create a Profile API
    const [userName] = useState("User");

    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses = async () => {

        try {

            const response = await getExpenses();

            setExpenses(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    const totalExpense = expenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

    return (

        <Layout>

            <div className="container-fluid">

                <div className="dashboard-hero rounded-4 p-4 mb-4 shadow-sm">

                    <div>

                        <h2 className="fw-bold mb-2">

                            Welcome back

                        </h2>

                        <p className="mb-0 text-muted">

                            Here's a quick snapshot of your spending and progress.

                        </p>

                    </div>

                    <div className="badge bg-white text-primary fw-semibold px-3 py-2">

                        Smart Finance

                    </div>

                </div>

                <div className="row g-4">

                    <div className="col-lg-3 col-md-6">

                        <ExpenseCard
                            title="Total Expense"
                            value={`₹${totalExpense}`}
                            color="bg-primary"
                        />

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <ExpenseCard
                            title="Transactions"
                            value={expenses.length}
                            color="bg-success"
                        />

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <ExpenseCard
                            title="Average"
                            value={
                                expenses.length
                                    ? `₹${Math.round(totalExpense / expenses.length)}`
                                    : "₹0"
                            }
                            color="bg-warning"
                        />

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <ExpenseCard
                            title="Latest"
                            value={
                                expenses.length
                                    ? `₹${expenses[expenses.length - 1].amount}`
                                    : "₹0"
                            }
                            color="bg-danger"
                        />

                    </div>

                </div>

                <div className="card mt-5 shadow-sm border-0">

                    <div className="card-body">

                        <h3 className="mb-4 fw-bold">

                            Recent Expenses

                        </h3>

                        <ExpenseTable expenses={expenses} />

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Dashboard;