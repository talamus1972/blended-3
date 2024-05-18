import { Schema, model } from "mongoose";
import findOrCreate from "mongoose-findorcreate";

const userSchema = new Schema(
  {
    password: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.plugin(findOrCreate);

const User = model("User", userSchema);

export default User;
