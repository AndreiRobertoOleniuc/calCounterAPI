import mongoose, { Document } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  google_id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  photo?: string; // Optional field
}

// Define the schema using the TypeScript interface
const userSchema = new mongoose.Schema({
  google_id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: false }, // Making it explicitly optional
});

// Create the model
const User = mongoose.model<IUser>("user", userSchema);

export default User;
