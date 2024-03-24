import http from "http";
import { getUser, updateHobies as updateHobiesFromDB } from "../data";
import { parseRequestBody } from "../utils";

export const updateHobies = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const match = req.url?.match(/^\/api\/users\/([^\/]+)\/hobbies$/);
  const userId = match?.[1] ?? "";
  res.setHeader("Content-Type", "application/json");

  const user = getUser(userId);
  if (!user) {
    res.statusCode = 404;
    res.end({
      data: null,
      error: `User with id ${userId} doesn't exist`,
    });
    return;
  }

  const { hobbies } = (await parseRequestBody(req)) as {
    hobbies: string[];
  };

  const newHobbies = updateHobiesFromDB(userId, hobbies);
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      data: {
        user,
        links: {
          self: `/api/users/${userId}`,
          hobbies: `/api/users/${userId}/hobbies`,
        },
      },
      error: null,
    })
  );
};
