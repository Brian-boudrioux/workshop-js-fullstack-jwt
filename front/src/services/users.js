import api from "./api";

const getAllUsers = () => {
    return api.get("/users");
}

const getCurrentUser = () => {
    return api.get("/users/me");
}

export default {getAllUsers, getCurrentUser};
