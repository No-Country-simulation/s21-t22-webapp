import { S3Repository } from "../repositories/s3.repository.js";

export const UploadService = {
  async uploadFile(file) {
    if (!file) {
      throw new Error("No se envió ningún archivo");
    }

    return await S3Repository.uploadFile(file.buffer, file.originalname, file.mimetype);
  },
};