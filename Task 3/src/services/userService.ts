import { users } from "../data/users.js";
import type { User } from "../types/types.js";
const getUserById = (id: number) => {
  const user = users.find((user) => user.id === id);
  return user || null;
};

const createUser = (user: User) => {
  users.push(user);
  return users;
};
const updateUserById = (
  id: number,
  payload: { name: string; email: string },
) => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  user.name = payload.name;
  user.email = payload.email;
  return user;
};

const deleteUserById = (id: number) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return false;
  }
  users.splice(index, 1);
  return true;
};

export { getUserById, createUser, updateUserById, deleteUserById };
