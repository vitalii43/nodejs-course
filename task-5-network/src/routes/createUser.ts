import http from "http";
import { parseRequestBody } from "../utils";
import { users, hobbies } from "../data";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const body = (await parseRequestBody(req)) as {
    name: string;
    email: string;
  };
  const id = uuidv4();
  const user = { id, name: body.name, email: body.email };
  users.push(user);
  hobbies[id] = [];

  res.statusCode = 201;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      data: {
        user,
        links: {
          self: `/api/users/${id}`,
          hobbies: `/api/users/${id}/hobbies`,
        },
      },
      error: null,
    })
  );
};
