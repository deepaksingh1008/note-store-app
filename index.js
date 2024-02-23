import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dbConnection } from "./src/shared/db/connection.js";
import userRoutes from "./src/modules/user/routes/user-routes.js";
import noteRouter from "./src/modules/notes/routes/note-routes.js";
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
console.log(_dirname);
const app = express();
dotenv.config();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use("/api/v1", userRoutes);
app.use("/api/v1/", noteRouter);
//app listen
app.use(express.static(path.join(_dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "/client/build/index.html"));
});
app.listen(process.env.PORT, () => {
  // console.log(`Server is running on Port number ${process.env.PORT}`.bgMagenta);
  dbConnection();
});
