import { useEffect, useState } from "react";

import {
    Pie,
    Bar,
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import Layout from "../components/Layout";
import { getAnalytics } from "../services/analyticsService";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Analytics() {

    const [analytics, setAnalytics] = useState({
        totalExpense: 0,
        totalTransactions: 0,
        categoryData: {}
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {

        try {

            const response = await getAnalytics();

            console.log("Analytics Response:", response.data);

            setAnalytics(response.data);

        } catch (error) {

            console.log(error);

        }

        setLoading(false);

    };

    // Support both backend field names
    const categories =
        analytics.categoryData ||
        analytics.categoryWiseExpense ||
        {};

    const labels = Object.keys(categories);

    const values = Object.values(categories);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Expense Amount",
                data: values,
                backgroundColor: [
                    "#4F46E5",
                    "#06B6D4",
                    "#10B981",
                    "#F59E0B",
                    "#EF4444",
                    "#EC4899",
                    "#8B5CF6",
                    "#14B8A6"
                ],
                borderColor: "#ffffff",
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }
        ]
    };

    return (

        <Layout>

            <div className="container-fluid">

                <div className="card shadow-lg border-0">

                    <div className="card-body">

                        <h2 className="fw-bold mb-4">
                            📊 Expense Analytics
                        </h2>

                        <div className="row mb-4">

                            <div className="col-md-6">

                                <div className="alert alert-primary">

                                    <h4>
                                        Total Expense
                                    </h4>

                                    <h2>
                                        ₹ {analytics.totalExpense}
                                    </h2>

                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="alert alert-success">

                                    <h4>
                                        Transactions
                                    </h4>

                                    <h2>
                                        {analytics.totalTransactions}
                                    </h2>

                                </div>

                            </div>

                        </div>

                        {loading ? (

                            <div className="text-center">

                                <div className="spinner-border text-primary"></div>

                            </div>

                        ) : labels.length === 0 ? (

                            <div className="alert alert-warning">

                                No Expense Data Found

                            </div>

                        ) : (

                            <>

                                <div className="row">

                                    <div className="col-lg-6 mb-4">

                                        <div className="card shadow">

                                            <div className="card-body">

                                                <h4 className="text-center mb-3">
                                                    Pie Chart
                                                </h4>

                                                <Pie data={chartData} />

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-lg-6 mb-4">

                                        <div className="card shadow">

                                            <div className="card-body">

                                                <h4 className="text-center mb-3">
                                                    Bar Chart
                                                </h4>

                                                <Bar data={chartData} />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="card shadow">

                                    <div className="card-body">

                                        <h4 className="text-center mb-4">
                                            Expense Trend
                                        </h4>

                                        <Line data={chartData} />

                                    </div>

                                </div>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Analytics;