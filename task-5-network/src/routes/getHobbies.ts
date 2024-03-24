import http from "http";
import { getUser, getHobbies } from "../data";

export const getHobies = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const match = req.url?.match(/^\/api\/users\/([^\/]+)\/hobbies$/);
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
  res.setHeader("Cache-Control", "max-age=3600");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      data: {
        hobbies: getHobbies(userId),
        link: {
          self: `/api/users/${userId}/hobbies`,
          user: `/api/users/${userId}`,
        },
      },
      error: null,
    })
  );
};
