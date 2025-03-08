import express from "express";
import { uploadAws } from "../controllers/s3.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const awsRouter = express.Router();

awsRouter.post("/upload", upload.single("file") ,uploadAws);

export default awsRouter;