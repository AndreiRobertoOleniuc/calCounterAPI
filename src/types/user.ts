import { Document } from "mongoose";

export default interface User extends Document {
  google_id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  photo?: string; // Optional field
}
