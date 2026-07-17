import api from "./api";

export const getGoals = () => {
    return api.get("/goals");
};

export const addGoal = (goal) => {
    return api.post("/goals", goal);
};

export const updateGoal = (id, goal) => {
    return api.put(`/goals/${id}`, goal);
};

export const deleteGoal = (id) => {
    return api.delete(`/goals/${id}`);
};