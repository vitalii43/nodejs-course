import { User } from "../entities";
import { DI } from "../index";

// currently user added manualy in db
export const isUserExist = async (id: string) => {
  try {
    const user = await DI.em.findOne(User, id);
    return user;
  } catch (err) {
    return false;
  }
};
