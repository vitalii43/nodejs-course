import csvtojson from "csvtojson";
import fs from "fs";

const writableStream = fs.createWriteStream("./src/example.txt");

csvtojson()
  .fromFile("./src/example.csv")
  .on("data", (data) => {
    const jsonStr = data.toString("utf8");
    const { Amount, ...rest } = JSON.parse(jsonStr);
    writableStream.write(JSON.stringify(rest) + "\r");
  })
  .on("end", () => {
    writableStream.end();
  });
