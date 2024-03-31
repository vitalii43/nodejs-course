export const users = [{ id: "admin1234" }];

export const isUserExist = (id: string) => {
  return users.find((user) => user.id === id);
};
