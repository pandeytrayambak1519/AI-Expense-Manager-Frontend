import api from "./api";

export const registerUser = (data) => {
    return api.post("/auth/register", data);
};

export const loginUser = (data) => {
    return api.post("/auth/login", data);
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const clearAuthSession = () => {
    localStorage.removeItem("token");
};

export const getStoredUser = () => {

    try {

        return JSON.parse(
            localStorage.getItem("currentUser")
        );

    } catch {

        return null;

    }

};