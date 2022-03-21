import multer from "multer";

const destination = "./files";
const filename = (req, file, cb) => cb(null, file.originalname);

const allowedImagesExts = ["jpg", "png", "gif", "jpeg"];
const fileFilter = (req, file, cb) =>
  cb(null, allowedImagesExts.includes(file.originalname.split(".").pop()));

const storage = multer.diskStorage({ destination, filename });

const upload = multer({ storage, fileFilter }).single("myFile");

export default upload;
