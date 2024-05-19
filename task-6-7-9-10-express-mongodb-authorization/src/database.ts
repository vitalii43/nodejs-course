import mongoose from "mongoose";

export const connect = async () => {
  const { MONGO_URI } = process.env;
  if (!MONGO_URI) {
    console.log(
      "Please provide DataBase URI to connect and server PORT. exiting now..."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
  } catch (e) {
    console.log("DataBase connection failed. exiting now...");
    console.error(e);
    process.exit(1);
  }
};
