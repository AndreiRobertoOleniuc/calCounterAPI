import { MessurementTypes } from "./messurementTypes";

export default interface Food {
  _id: string;
  name: string;
  brand?: string;
  description?: string;
  calories: number;
  messurement: MessurementTypes;
  dosage: number;
  image?: string;
  nurition: {
    fat: number;
    carbohydrates: number;
    protein: number;
  };
}
