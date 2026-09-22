import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const UserModel = mongoose.model("IdentityUser", userSchema);
