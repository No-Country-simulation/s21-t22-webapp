import { uploadService } from "../services/s3.service.js";

export const UploadController = async (req, res) => {
      try {
        const result = await uploadService.uploadFile(req.file);
        res.json({ message: "Archivo subido con éxito", file: result.fileName });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

  };