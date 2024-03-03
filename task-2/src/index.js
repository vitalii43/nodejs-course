import { execCommand, isUnixLike, isWindows, logToFile } from "./utils.js";
import {
  REFRESH_INTERVAL,
  WIN_COMMAND,
  UNIX_COMMAND,
  LOG_TO_FILE_INTERVAL,
} from "./constants.js";

(() => {
  if (!isUnixLike && !isWindows) {
    console.error("Your OS is't supported");
    return;
  }

  let currentOutput = "";

  const consoleInterval = setInterval(async () => {
    try {
      const command = isUnixLike ? UNIX_COMMAND : WIN_COMMAND;
      const res = await execCommand(command);
      console.clear();
      console.log(res.trim());
      currentOutput = `${currentOutput}${Math.floor(
        new Date().getTime() / 1000
      )}: ${res.trim()}\r`;
    } catch (err) {
      console.log("Error during executing monitor command:", err);
      clearIntervals();
    }
  }, REFRESH_INTERVAL);

  const fileInterval = setInterval(() => {
    try {
      logToFile(currentOutput);
      currentOutput = "";
    } catch (err) {
      console.error("Error during writing to file: ", err);
      clearIntervals();
    }
  }, LOG_TO_FILE_INTERVAL);

  const clearIntervals = () => {
    clearInterval(fileInterval);
    clearInterval(consoleInterval);
  };
})();
