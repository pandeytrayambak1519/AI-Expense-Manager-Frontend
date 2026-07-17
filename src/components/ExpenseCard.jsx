function ExpenseCard({

    title,

    value,

    color

}) {

    return (

        <div className={`card dashboard-card ${color} shadow-sm border-0 h-100`}>

            <div className="card-body text-center py-4">

                <h5 className="fw-semibold mb-3">

                    {title}

                </h5>

                <h2 className="mt-2 fw-bold">

                    {value}

                </h2>

            </div>

        </div>

    );

}

export default ExpenseCard;