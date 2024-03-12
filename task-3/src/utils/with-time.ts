import { EventEmitter } from "./event-emiter";
import https from "https";

export class WithTime extends EventEmitter {
  async execute(asyncFunc: (...any: any[]) => Promise<any>, ...args: any[]) {
    this.emit("begin");
    const start = performance.now();
    this.emit("data", await asyncFunc(...args));
    const end = performance.now();
    this.emit("end", end - start);
  }
}

export const fetchFromUrl = (url: string) => {
  return new Promise((resolve, reject) => {
    const req = https.request(new URL(url), (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(data));
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};
