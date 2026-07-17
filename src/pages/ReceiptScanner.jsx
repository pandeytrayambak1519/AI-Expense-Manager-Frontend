import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function ReceiptScanner() {

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState(null);

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setExpense(null);
    };

    const scanReceipt = async () => {

        if (!image) {
            alert("Please select a receipt.");
            return;
        }

        setLoading(true);

        try {

            const formData = new FormData();
            formData.append("image", image);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "https://ai-expense-manager-backend-2.onrender.com/api/receipt/create-expense",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Response:", response.data);

            setExpense(response.data);

            alert("Expense Added Successfully");

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(error.response.data.message || "Receipt processing failed");
            } else {
                alert("Receipt processing failed");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>

            <div className="card">

                <div className="card-body">

                    <h2 className="fw-bold mb-4">
                        📄 AI Receipt Scanner
                    </h2>

                    <input
                        type="file"
                        className="form-control"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleImage}
                    />

                    <button
                        className="btn btn-primary mt-3"
                        disabled={loading}
                        onClick={scanReceipt}
                    >
                        {loading ? "Processing..." : "Scan Receipt"}
                    </button>

                    {expense && (
                        <div className="card mt-4">
                            <div className="card-body">

                                <h4>Expense Details</h4>

                                <p><strong>ID:</strong> {expense.id}</p>
                                <p><strong>Description:</strong> {expense.description}</p>
                                <p><strong>Amount:</strong> ₹{expense.amount}</p>
                                <p><strong>Date:</strong> {expense.expenseDate}</p>

                            </div>
                        </div>
                    )}

                </div>

            </div>

        </Layout>
    );
}

export default ReceiptScanner;