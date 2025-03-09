import express from "express";
import { UploadController } from "../controllers/s3.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const awsRouter = express.Router();

awsRouter.post("/upload", upload.single("file") ,UploadController);

export default awsRouter;