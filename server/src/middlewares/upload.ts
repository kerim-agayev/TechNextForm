import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "./uploads");
    fs.mkdirSync(uploadPath, { recursive: true }); // Klasörü oluştur
    cb(null, uploadPath); 
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
  },
});

const uploadmulti = multer({ storage: storage });

export { uploadmulti};