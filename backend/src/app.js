import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import indexRouter from "./routes/index.route.js";

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());

//Imprime en consola las peticiones al server
app.use(morgan());

app.use("/api", indexRouter);

//Always Redirect api
app.get("/", (req, res) => {
  res.redirect("/api");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Sever running on http://localhost:${PORT}`)
);
