import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import indexRouter from "./routes/index.route.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const swaggerDocument = YAML.load("./src/docs/swagger.yaml");

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", indexRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Always Redirect api
app.get("/", (req, res) => {
  res.redirect("/api");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Sever running on http://localhost:${PORT}`)
);
