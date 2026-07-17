import axios from "axios";

const api = axios.create({
    baseURL:
    "https://ai-expense-manager-backend-2.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    const isAuthApi =
        config.url === "/auth/login" ||
        config.url === "/auth/register";

    if (token && !isAuthApi) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;