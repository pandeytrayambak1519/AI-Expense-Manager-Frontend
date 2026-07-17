import api from "./api";
import { createNotification } from "./notificationService";

const normalizeBudgetPayload = (payload) => {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        return {};
    }

    if (payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
        const candidate = payload.data;

        if (
            candidate.monthlyBudget !== undefined ||
            candidate.month !== undefined ||
            candidate.year !== undefined ||
            candidate.id !== undefined
        ) {
            return candidate;
        }
    }

    if (payload.budget && typeof payload.budget === "object" && !Array.isArray(payload.budget)) {
        return payload.budget;
    }

    return payload;
};

const buildBudgetPayload = (budget = {}) => {
    const today = new Date();
    const month = budget.month === "" || budget.month === undefined || budget.month === null
        ? today.getMonth() + 1
        : Number(budget.month);
    const year = budget.year === "" || budget.year === undefined || budget.year === null
        ? today.getFullYear()
        : Number(budget.year);
    const monthlyBudget = budget.monthlyBudget === "" || budget.monthlyBudget === undefined || budget.monthlyBudget === null
        ? 0
        : Number(budget.monthlyBudget);

    return {
        ...budget,
        monthlyBudget,
        month,
        year,
    };
};

export const getBudget = async () => {
    const response = await api.get("/budget");
    return {
        ...response,
        data: normalizeBudgetPayload(response?.data),
    };
};

export const saveBudget = async (budget) => {
    const payload = buildBudgetPayload(budget);
    const response = await api.post("/budget", payload);

    try {
        const month = payload.month || "current";
        const year = payload.year || "";
        const amount = payload.monthlyBudget || 0;
        const message = year
            ? `Budget created for ${month}/${year} with amount ₹${amount}`
            : `Budget created for ${month} with amount ₹${amount}`;

        await createNotification(message, "SUCCESS");
    } catch (notificationError) {
        console.error("Failed to create notification", notificationError);
    }

    return response;
};

export const updateBudget = async (budget) => {
    const payload = buildBudgetPayload(budget);
    const response = await api.put("/budget", payload);

    try {
        const month = payload.month || "current";
        const year = payload.year || "";
        const amount = payload.monthlyBudget || 0;
        const message = year
            ? `Budget updated for ${month}/${year} with amount ₹${amount}`
            : `Budget updated for ${month} with amount ₹${amount}`;

        await createNotification(message, "SUCCESS");
    } catch (notificationError) {
        console.error("Failed to create notification", notificationError);
    }

    return response;
};

export const getSpent = () => api.get("/budget/spent");

export const getRemaining = () => api.get("/budget/remaining");

export const getUsage = () => api.get("/budget/usage");