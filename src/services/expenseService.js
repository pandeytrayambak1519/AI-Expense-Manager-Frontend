import API from "./api";
import { getAnalytics } from "./analyticsService";
import { getBudget } from "./budgetService";
import { createNotification } from "./notificationService";

export const getExpenses=()=>{

    return API.get("/expenses");

}

export const addExpense = async (expense) => {
    let exceededBudget = false;
    let alertMessage = "Expense Added Successfully";

    try {
        const [budgetResponse, analyticsResponse] = await Promise.all([
            getBudget(),
            getAnalytics()
        ]);

        const monthlyBudget = Number(budgetResponse?.data?.monthlyBudget || 0);
        const previousTotal = Number(analyticsResponse?.data?.totalExpense || 0);
        const expenseAmount = Number(expense.amount || 0);
        const newTotal = previousTotal + expenseAmount;

        exceededBudget = monthlyBudget > 0 && newTotal > monthlyBudget;

        if (exceededBudget) {
            alertMessage = `Budget exceeded! You spent ₹${newTotal} against your budget of ₹${monthlyBudget}.`;
        }
    } catch (error) {
        console.error("Unable to check budget limit", error);
    }

    const response = await API.post("/expenses", expense);

    try {
        const message = exceededBudget
            ? `Budget exceeded! New expense of ₹${expense.amount} pushed your total beyond the monthly budget.`
            : expense.description
                ? `New expense added: ${expense.description}`
                : `New expense added for ${expense.category || "uncategorized"}`;

        await createNotification(message, exceededBudget ? "WARNING" : "SUCCESS");
    } catch (notificationError) {
        console.error("Failed to create notification", notificationError);
    }

    return { response, exceededBudget, message: alertMessage };
}

export const filterExpenses = (filterData) => {
    return API.post("/expenses/filter", filterData);
};

export const updateExpense=(id,expense)=>{

    return API.put(`/expenses/${id}`,expense);

}

export const deleteExpense=(id)=>{

    return API.delete(`/expenses/${id}`);

}