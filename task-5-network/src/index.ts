import http from "http";
import {
  getUsers,
  createUser,
  deleteUser,
  updateHobies,
  getHobies,
} from "./routes";

const server = http.createServer((req, res) => {
  try {
    if (req.method === "GET" && /^\/api\/users$/.test(req.url ?? "")) {
      getUsers(req, res);
      return;
    }

    if (req.method === "POST" && /\/api\/users$/.test(req.url ?? "")) {
      createUser(req, res);
      return;
    }

    if (
      req.method === "DELETE" &&
      /^\/api\/users\/[^\/]+$/.test(req.url ?? "")
    ) {
      deleteUser(req, res);
      return;
    }

    if (
      req.method === "PATCH" &&
      /^\/api\/users\/[^\/]+\/hobbies$/.test(req.url ?? "")
    ) {
      updateHobies(req, res);
      return;
    }

    if (
      req.method === "GET" &&
      /^\/api\/users\/[^\/]+\/hobbies$/.test(req.url ?? "")
    ) {
      getHobies(req, res);
      return;
    }

    res.statusCode = 404;
    res.end("Not Found");
  } catch (err) {
    res.statusCode = 500;
    res.end("Internal server error");
  }
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
