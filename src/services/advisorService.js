import api from "./api";

export const getAdvice = () => {
    return api.get("/advisor");
};