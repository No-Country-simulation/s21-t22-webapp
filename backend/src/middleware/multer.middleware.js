import multer from "multer";

const storage = multer.memoryStorage(); // Guarda en RAM en lugar de disco


const fileFilter = (req, file, cb) => {

  if (file.mimetype.startsWith("image/")) {
    
    cb(null, true);

  } else {

    cb(new Error("Solo se permiten imágenes"), false);

  }
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // Máx 5MB