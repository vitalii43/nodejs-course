import { CurrentUser } from "../../types";

declare global {
  namespace Express {
    interface Request {
      user: CurrentUser;
    }
  }
}
