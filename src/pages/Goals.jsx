import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal
} from "../services/goalService";

function Goals() {

    const [goals, setGoals] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);
    const [goalForm, setGoalForm] = useState({
        title: "",
        targetAmount: "",
        savedAmount: "",
        targetDate: ""
    });

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {

        try {

            const response = await getGoals();
            setGoals(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const resetForm = () => {
        setGoalForm({
            title: "",
            targetAmount: "",
            savedAmount: "",
            targetDate: ""
        });
        setEditingGoal(null);
        setShowForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGoalForm({ ...goalForm, [name]: value });
    };

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...goalForm,
                targetAmount: Number(goalForm.targetAmount),
                savedAmount: Number(goalForm.savedAmount || 0)
            };

            if (editingGoal) {
                await updateGoal(editingGoal.id, payload);
            } else {
                await addGoal(payload);
            }

            resetForm();
            loadGoals();
        } catch (error) {
            alert(editingGoal ? "Update Failed" : "Create Failed");
        }
    };

    const handleEdit = (goal) => {
        setEditingGoal(goal);
        setGoalForm({
            title: goal.title,
            targetAmount: goal.targetAmount,
            savedAmount: goal.savedAmount,
            targetDate: goal.targetDate || ""
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this goal?")) return;

        try {

            await deleteGoal(id);

            loadGoals();

        } catch (error) {

            alert("Delete Failed");

        }

    };

    const totalTarget = goals.reduce(
        (sum, g) => sum + g.targetAmount,
        0
    );

    const totalSaved = goals.reduce(
        (sum, g) => sum + g.savedAmount,
        0
    );

    return (

        <Layout>

            <div className="container-fluid">

                <div
                    className="p-4 mb-4 rounded-4 text-white shadow"
                    style={{
                        background:
                            "linear-gradient(135deg,#2563eb,#4f46e5)"
                    }}
                >

                    <h2 className="fw-bold">
                        🎯 Savings Goals Dashboard
                    </h2>

                    <p className="mb-0">
                        Track your financial goals and monitor your savings progress.
                    </p>

                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div></div>
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                    >
                        ➕ Add Goal
                    </button>
                </div>

                {showForm && (
                    <div className="card shadow border-0 rounded-4 mb-4">
                        <div className="card-body">
                            <h4 className="mb-3">
                                {editingGoal ? "✏ Update Goal" : "➕ Create Goal"}
                            </h4>
                            <form onSubmit={handleCreateOrUpdate}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Goal Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={goalForm.title}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Target Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="targetAmount"
                                            value={goalForm.targetAmount}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Saved Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="savedAmount"
                                            value={goalForm.savedAmount}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Target Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="targetDate"
                                            value={goalForm.targetDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="btn btn-primary me-2">
                                        {editingGoal ? "Update Goal" : "Create Goal"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={resetForm}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="row mb-4">

                    <div className="col-md-4">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <h6>Total Goals</h6>

                                <h2 className="text-primary">

                                    {goals.length}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <h6>Total Target</h6>

                                <h2 className="text-success">

                                    ₹{totalTarget}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <h6>Total Saved</h6>

                                <h2 className="text-warning">

                                    ₹{totalSaved}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                {

                    goals.map(goal => {

                        const percent = Math.min(
                            (goal.savedAmount / goal.targetAmount) * 100,
                            100
                        );

                        return (

                            <div
                                key={goal.id}
                                className="card shadow border-0 rounded-4 mb-4"
                            >

                                <div className="card-body">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <h4>

                                                🎯 {goal.title}

                                            </h4>

                                            <p className="mb-1">

                                                Target :
                                                <b> ₹{goal.targetAmount}</b>

                                            </p>

                                            <p>

                                                Saved :
                                                <b className="text-success">

                                                    ₹{goal.savedAmount}

                                                </b>

                                            </p>

                                        </div>

                                        <div>

                                            {

                                                goal.status === "Completed" ?

                                                    <span className="badge bg-success fs-6">

                                                        Completed

                                                    </span>

                                                    :

                                                    <span className="badge bg-warning text-dark fs-6">

                                                        In Progress

                                                    </span>

                                            }

                                        </div>

                                    </div>

                                    <div className="progress mt-3">

                                        <div
                                            className="progress-bar bg-primary"
                                            style={{
                                                width: `${percent}%`
                                            }}
                                        >

                                            {percent.toFixed(0)}%

                                        </div>

                                    </div>

                                    <div className="mt-4">

                                        <button
                                            className="btn btn-primary me-3"
                                            onClick={() => handleEdit(goal)}
                                        >

                                            ✏ Update

                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(goal.id)}
                                        >

                                            🗑 Delete

                                        </button>

                                    </div>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </Layout>

    );

}

export default Goals;