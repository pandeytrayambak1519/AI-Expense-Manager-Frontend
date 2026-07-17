import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getAnalytics } from "../services/analyticsService";
import {
    getBudget,
    saveBudget,
    updateBudget
} from "../services/budgetService";

import { Doughnut } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function Budget() {

    const getDefaultBudget = () => ({
        monthlyBudget: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });

    const [budget, setBudget] = useState(getDefaultBudget);

    const [editing, setEditing] = useState(false);

    const [spent, setSpent] = useState(0);

    useEffect(() => {

        loadBudget();

    }, []);

     const loadBudget = async () => {

    try {

        // Load Budget
        const budgetResponse = await getBudget();

        if (budgetResponse?.data) {
            setBudget({
                ...getDefaultBudget(),
                ...budgetResponse.data
            });
        }

        // Load Analytics
        const analyticsResponse = await getAnalytics();

        if (analyticsResponse.data) {
            setSpent(analyticsResponse.data.totalExpense);
        }

    } catch (error) {

        console.log(error);

    }

};

    const save = async () => {

        try {
            const payload = {
                ...budget,
                monthlyBudget: Number(budget.monthlyBudget || 0),
                month: Number(budget.month || new Date().getMonth() + 1),
                year: Number(budget.year || new Date().getFullYear())
            };

            if (budget.id) {

                await updateBudget(payload);

            } else {

                await saveBudget(payload);

            }

            alert("Budget Saved Successfully");

            setEditing(false);

            await loadBudget();

        } catch (error) {

            const message = error?.response?.data?.message
                || error?.response?.data?.error
                || error?.message
                || "Unable to save budget";

            console.error(message, error);

            alert(message);

        }

    };

    const remaining =
        Number(budget.monthlyBudget || 0) - Number(spent);

    const progress =
        budget.monthlyBudget > 0
            ? (spent / budget.monthlyBudget) * 100
            : 0;

    const chartData = {

        labels: [
            "Spent",
            "Remaining"
        ],

        datasets: [

            {

                data: [

                    spent,

                    remaining > 0 ? remaining : 0

                ],

                backgroundColor: [

                    "#ef4444",

                    "#22c55e"

                ],

                borderWidth: 2

            }

        ]

    };

    return (

        <Layout>

            <div className="container-fluid py-4">

                <div className="row">

                    <div className="col-lg-8">

                        <div className="card shadow-lg border-0 rounded-4">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <h2 className="fw-bold">

                                        💰 Monthly Budget

                                    </h2>

                                    {

                                        !editing && (

                                            <button
                                                className="btn btn-primary"
                                                onClick={() => setEditing(true)}
                                            >
                                                Update Budget
                                            </button>

                                        )

                                    }

                                </div>

                                {

                                    editing ? (

                                        <>
                                            <div className="mb-3">

                                                <label className="form-label">

                                                    Monthly Budget

                                                </label>

                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={budget.monthlyBudget}
                                                    onChange={(e) =>
                                                        setBudget({
                                                            ...budget,
                                                            monthlyBudget: e.target.value
                                                        })
                                                    }
                                                />

                                            </div>

                                            <div className="row">

                                                <div className="col-md-6">

                                                    <label className="form-label">

                                                        Month

                                                    </label>

                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={budget.month}
                                                        onChange={(e) =>
                                                            setBudget({
                                                                ...budget,
                                                                month: e.target.value
                                                            })
                                                        }
                                                    />

                                                </div>

                                                <div className="col-md-6">

                                                    <label className="form-label">

                                                        Year

                                                    </label>

                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={budget.year}
                                                        onChange={(e) =>
                                                            setBudget({
                                                                ...budget,
                                                                year: e.target.value
                                                            })
                                                        }
                                                    />

                                                </div>

                                            </div>

                                            <div className="mt-4">

                                                <button
                                                    className="btn btn-success me-2"
                                                    onClick={save}
                                                >
                                                    Save Budget
                                                </button>

                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => setEditing(false)}
                                                >
                                                    Cancel
                                                </button>

                                            </div>

                                        </>

                                    ) : (

                                        <>

                                            <h1 className="display-5 text-primary fw-bold">

                                                ₹{budget.monthlyBudget || 0}

                                            </h1>

                                            <h5 className="text-muted">

                                                Month : {budget.month}

                                            </h5>

                                            <h5 className="text-muted">

                                                Year : {budget.year}

                                            </h5>

                                            <hr />

                                            <h5 className="mb-3">

                                                Budget Usage

                                            </h5>

                                            <div
                                                className="progress"
                                                style={{ height: "30px" }}
                                            >

                                                <div
                                                    className={`progress-bar ${
                                                        progress >= 80
                                                            ? "bg-danger"
                                                            : "bg-success"
                                                    }`}
                                                    style={{
                                                        width: `${Math.min(progress, 100)}%`
                                                    }}
                                                >

                                                    {progress.toFixed(1)}%

                                                </div>

                                            </div>

                                        </>

                                    )

                                }

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <div className="card shadow-lg border-0 rounded-4">

                            <div className="card-body">

                                <h4 className="text-center mb-4">

                                    Budget Overview

                                </h4>

                                <Doughnut data={chartData} />

                            </div>

                        </div>

                    </div>

                </div>

                <div className="row mt-4">
                    <div className="col-md-4">

                        <div className="card bg-primary text-white shadow-lg border-0 rounded-4">

                            <div className="card-body text-center">

                                <h5>Total Budget</h5>

                                <h2 className="fw-bold">

                                    ₹{budget.monthlyBudget || 0}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card bg-danger text-white shadow-lg border-0 rounded-4">

                            <div className="card-body text-center">

                                <h5>Total Spent</h5>

                                <h2 className="fw-bold">

                                    ₹{spent}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card bg-success text-white shadow-lg border-0 rounded-4">

                            <div className="card-body text-center">

                                <h5>Remaining</h5>

                                <h2 className="fw-bold">

                                    ₹{remaining}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="row mt-4">

                    <div className="col-12">

                        <div className="card shadow-lg border-0 rounded-4">

                            <div className="card-body">

                                <h4 className="fw-bold mb-4">

                                    📊 Budget Summary

                                </h4>

                                <table className="table table-bordered align-middle">

                                    <tbody>

                                        <tr>

                                            <th width="40%">

                                                Monthly Budget

                                            </th>

                                            <td>

                                                ₹{budget.monthlyBudget || 0}

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>

                                                Total Spent

                                            </th>

                                            <td>

                                                ₹{spent}

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>

                                                Remaining Budget

                                            </th>

                                            <td className={
                                                remaining < 0
                                                    ? "text-danger fw-bold"
                                                    : "text-success fw-bold"
                                            }>

                                                ₹{remaining}

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>

                                                Usage

                                            </th>

                                            <td>

                                                {progress.toFixed(1)}%

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>

                                                Status

                                            </th>

                                            <td>

                                                {

                                                    progress >= 100 ?

                                                        <span className="badge bg-danger">

                                                            Budget Exceeded

                                                        </span>

                                                        :

                                                        progress >= 80 ?

                                                            <span className="badge bg-warning text-dark">

                                                                Warning

                                                            </span>

                                                            :

                                                            <span className="badge bg-success">

                                                                Healthy

                                                            </span>

                                                }

                                            </td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Budget;