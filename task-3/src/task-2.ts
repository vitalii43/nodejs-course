import { WithTime, fetchFromUrl } from "./utils/with-time";

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", (time) => console.log(`Done with execute time ${time} ms`));
withTime.on("data", console.log);

withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/1");

console.log(withTime.rawListeners("end"));
