import upload from "../services/uploadService.js";

const handleUpload = (req, res) => {
  res.send({ url: req.file.path });
};

export { upload, handleUpload };
