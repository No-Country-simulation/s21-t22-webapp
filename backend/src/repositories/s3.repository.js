import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";

export const S3Repository = {
    
  async uploadFile(fileBuffer, fileName, mimeType) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${fileName}`, // Ruta en S3
      Body: fileBuffer,
      ContentType: mimeType,
    };

    try {
      await s3.send(new PutObjectCommand(params));
      return { success: true, fileName };
    } catch (error) {
      console.error("Error al subir archivo:", error);
      throw new Error("Error al subir archivo a S3");
    }
  },
};