import { users } from "../data/users.js";
import { SUCCESS, FAIL, ERROR } from "../utils/HttpStatusText.js";
import { getUserById, createUser, updateUserById, deleteUserById, } from "../services/userService.js";
const getUsers = (req, res, next) => {
    if (users.length !== 0) {
        res.status(200).json({
            Results: users.length,
            status: SUCCESS,
            data: users,
        });
    }
    else {
        res.status(404).json({
            status: FAIL,
            message: "users doesn't exist",
        });
    }
};
const getUser = (req, res, next) => {
    const user = getUserById(Number(req.params.id));
    if (user) {
        res.status(200).json({
            status: SUCCESS,
            data: user,
        });
    }
    else {
        res.status(404).json({
            status: FAIL,
            message: "user doesn't exist",
        });
    }
};
const addUser = (req, res, next) => {
    const user = req.body;
    if (user) {
        const newUser = createUser(user);
        return res.status(201).json({
            status: SUCCESS,
            data: newUser,
        });
    }
    else {
        res.status(404).json({
            status: FAIL,
            message: "please , add user",
        });
    }
};
const updateUser = (req, res, next) => {
    const userId = Number(req.params.id);
    const { name, email } = req.body;
    const updatedUser = updateUserById(userId, { name, email });
    res.status(200).json({
        status: SUCCESS,
        data: updatedUser,
    });
};
const deleteUser = (req, res, next) => {
    const userId = Number(req.params.id);
    const isDeleted = deleteUserById(userId);
    if (!isDeleted) {
        return res.status(404).json({
            status: FAIL,
            message: "User not found",
        });
    }
    return res.status(200).json({
        status: SUCCESS,
        message: "user deleted successfully",
    });
};
export { getUsers, getUser, addUser, updateUser, deleteUser };
//# sourceMappingURL=userController.js.map