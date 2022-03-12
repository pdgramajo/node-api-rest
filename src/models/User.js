import mongoosel from "mongoose";
import ROLES from "../config/roles.js";

const userSchema = new mongoosel.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      Admin: Number, // 1
      Editor: Number, // 2
      User: {
        type: Number, // 3
        default: 3,
      },
    },
    phone: Number,
    tokenRefresh: String,
    isEnabled: {
      type: Boolean,
      default: true,
    },
    isBloqued: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoosel.model("User", userSchema);
