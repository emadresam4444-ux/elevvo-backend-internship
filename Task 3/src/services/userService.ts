import { users } from "../data/users.js";

const getUserById = (id: number) => {
  const user = users.find((user) => user.id === id);
  return user || null;
};

export { getUserById };
