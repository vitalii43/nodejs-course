import { User } from "../models";

// currently user added manualy in db
export const isUserExist = async (id: string) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (err) {
    return false;
  }
};
