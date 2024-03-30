import http from "http";
import { users } from "../data";

export const getUsers = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=3600, public");
  res.end(
    JSON.stringify({
      data: users.map((user) => ({
        user,
        links: {
          self: `/api/users/${user.id}`,
          hobbies: `/api/users/${user.id}/hobbies`,
        },
      })),
      error: null,
    })
  );
};
