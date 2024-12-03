import mongoose from "mongoose";

const Connection = async (username, password) => {
  const url =

  `mongodb+srv://${username}:${password}@blog-app.hwhxltu.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`;
  
  
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
};

export default Connection;
