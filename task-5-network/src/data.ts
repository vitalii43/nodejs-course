type User = {
  id: string;
  name: string;
  email: string;
};

export let users: User[] = [];
export const getUser = (userId: string) =>
  users.find(({ id }) => id === userId);
export const deleteUser = (userId: string) => {
  users = users.filter(({ id }) => id !== userId);
};

export const hobbies: { [key: string]: string[] } = {};
export const getHobbies = (userId: keyof typeof hobbies) => {
  return hobbies[userId];
};
export const updateHobies = (
  userId: keyof typeof hobbies,
  hobbiesToAdd: string[]
) => {
  hobbiesToAdd.forEach((hobby) => {
    if (!hobbies[userId].includes(hobby)) {
      hobbies[userId].push(hobby);
    }
  });

  return hobbies[userId];
};
