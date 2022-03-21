import { Router } from "express";
import { upload, handleUpload } from "../controllers/uploadController.js";
const router = Router();

router.post("/", upload, handleUpload);

export { router };
