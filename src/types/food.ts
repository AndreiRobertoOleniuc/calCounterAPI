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
    energy: number;
    calcium?: number;
    iron?: number;
    potassium?: number;
    sodium?: number;
    sugar?: number;
    zinc?: number;
    vitaminD?: number;
    vitaminC?: number;
    vitaminB12?: number;
    vitaminA?: number;
    vitaminB6?: number;
  };
}
