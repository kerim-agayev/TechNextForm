import multer from "multer";

// Define the storage
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
    console.log(`file:${file}`)
  },
});

// Upload parameter for multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3, // 3 MB
  },
});
