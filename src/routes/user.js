import { Router } from "express";
import {
  getAllUser,
  getUser,
  createUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.route("/").get(getAllUser);
router.route("/").post(createUser);

router.route("/:id").get(getUser).put(updateUser);

export default router;
