import http from "http";

export const parseRequestBody = (req: http.IncomingMessage) =>
  new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(JSON.parse(body));
    });

    req.on("error", (error: Error) => {
      reject(error);
    });
  });
