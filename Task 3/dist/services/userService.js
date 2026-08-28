import { users } from "../data/users.js";
const getUserById = (id) => {
    const user = users.find((user) => user.id === id);
    return user || null;
};
const createUser = (user) => {
    users.push(user);
    return users;
};
const updateUserById = (id, payload) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
        return null;
    }
    user.name = payload.name;
    user.email = payload.email;
    return user;
};
const deleteUserById = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        return false;
    }
    users.splice(index, 1);
    return true;
};
export { getUserById, createUser, updateUserById, deleteUserById };
//# sourceMappingURL=userService.js.map