import mongoose from "mongoose";

const connectDb = async () => {
  const url = process.env.CONNECTION_STRING;
  console.log("Trying to connect to DB with URL:", url);

  if (!url) {
    console.error("❌ CONNECTION_STRING is undefined! Check your .env file.");
    return;
  }

  try {
    await mongoose.connect(url);
    console.log("✅ Database connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

export default connectDb;
