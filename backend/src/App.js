import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "../utils/errorhandeler.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Allow specific HTTP methods (optional)
    credentials: true, // Allow cookies to be sent to the frontend (optional)
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import { Auth_routes } from "../routes/Auth_routes.js";
import { Servey_routes } from "../routes/Servey_routes.js";
import { Dashboard_routes } from "../routes/Dasboard_routes.js";
import { Question_routes } from "../routes/Question.routes.js";
import { Response_routes } from "../routes/response.routes.js";
app.use("/api/v1/auth", Auth_routes);
app.use("/api/v1/Serveys", Servey_routes);
app.use("/api/v1/profile", Dashboard_routes);
app.use("/api/v1/questions", Question_routes);
app.use("/api/v1/response", Response_routes);


app.use(errorHandler);

export { app };
