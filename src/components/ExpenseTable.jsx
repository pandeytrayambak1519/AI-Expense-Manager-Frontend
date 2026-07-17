function ExpenseTable({ expenses }) {

    return (

        <table className="table table-striped">

            <thead>

                <tr>

                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>

                </tr>

            </thead>

            <tbody>

                {expenses.map((expense) => (

                    <tr key={expense.id}>

                        <td>{expense.date}</td>

                        <td>{expense.description}</td>

                        <td>{expense.category}</td>

                        <td>₹{expense.amount}</td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default ExpenseTable;