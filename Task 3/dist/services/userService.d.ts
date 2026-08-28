import type { User } from "../types/types.js";
declare const getUserById: (id: number) => User | null;
declare const createUser: (user: User) => User[];
declare const updateUserById: (id: number, payload: {
    name: string;
    email: string;
}) => User | null;
declare const deleteUserById: (id: number) => boolean;
export { getUserById, createUser, updateUserById, deleteUserById };
//# sourceMappingURL=userService.d.ts.map