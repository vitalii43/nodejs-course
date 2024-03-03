import childProcess from "child_process";
import os from "os";
import fs from "fs";

const platform = os.platform();
export const isUnixLike = platform === "darwin" || "linux";
export const isWindows = platform === "win32";

export const execCommand = (command) => {
  return new Promise((res, rej) => {
    childProcess.exec(command, (error, stdout) => {
      if (error) {
        rej(error);
        return;
      }
      res(stdout);
    });
  });
};

export const logToFile = (response) => {
  const content = `${Math.floor(new Date().getTime() / 1000)}: ${response}\r`;
  fs.appendFile("activityMonitor.log", content, (err) => {
    if (err) {
      throw err;
    }
  });
};
