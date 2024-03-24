import http from "http";
import { getUser, deleteUser as deleteUserFromDB, hobbies } from "../data";

export const deleteUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const match = req.url?.match(/^\/api\/users\/([^\/]+)$/);
  const userId = match?.[1] ?? "";
  res.setHeader("Content-Type", "application/json");

  if (!getUser(userId)) {
    res.statusCode = 404;
    res.end({
      data: null,
      error: `User with id ${userId} doesn't exist`,
    });
    return;
  }

  deleteUserFromDB(userId);
  delete hobbies[userId];
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      data: {
        success: true,
      },
      error: null,
    })
  );
};
