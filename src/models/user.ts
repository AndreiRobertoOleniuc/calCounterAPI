import mongoose from "mongoose";
import User from "../types/user";

// Define the schema using the TypeScript interface
const userSchema = new mongoose.Schema({
  google_id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: false }, // Making it explicitly optional
});

// Create the model
const User = mongoose.model<User>("user", userSchema);

export default User;
