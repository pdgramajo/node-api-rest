import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
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

userSchema.pre("save", async (next) => {
  if (this.isModified("password") || this.isNew) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.methods.emailExists = async (email) => {
  const result = await this.find({ email });
  return result.length > 0;
};

userSchema.methods.getAllActiveUsers = async () => {
  const users = await this.find({ isBloqued: false, isEnabled: true });
  return users;
};

userSchema.methods.getAllBlockedUsers = async () => {
  const users = await this.find({ isBloqued: true, isEnabled: true });
  return users;
};

userSchema.methods.softDelete = async () => {
  // edit and set the isEnabled property in false
  const users = await this.find({ isBloqued: true, isEnabled: true });
  return users;
};

userSchema.methods.findByEmail = async (email) => {
  const user = await this.findOne({
    email: email,
    isBloqued: false,
    isEnabled: true,
  });
  return user;
};

export default mongoose.model("User", userSchema);
