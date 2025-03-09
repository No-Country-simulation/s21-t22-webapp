import express from "express";
import { uploadController } from "../controllers/s3.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const awsRouter = express.Router();

awsRouter.post("/upload", upload.single("file") ,uploadController);

export default awsRouter;