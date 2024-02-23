import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Database connected successfully".bgYellow))
    .catch((err) => console.error(`Error connecting to database ${err}`.bgRed));
};
