import { Router } from "express";
import { upload, handleUpload } from "../controllers/uploadController.js";
const router = Router();

router.route("/").post(upload, handleUpload);

export default router;
