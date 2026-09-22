import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    _id: { type: String },
    userId: { type: String, required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
);
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const SessionModel = mongoose.model("IdentitySession", sessionSchema);
