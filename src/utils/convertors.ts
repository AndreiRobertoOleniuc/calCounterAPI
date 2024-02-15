import { MessurementTypes } from "../types/messurementTypes";

export const convertMessurement = (
  from: MessurementTypes,
  to: MessurementTypes,
  value: number
) => {
  // Convert to grams
  let grams = 0;
  switch (from) {
    case MessurementTypes.ML:
      grams = value;
      break;
    case MessurementTypes.L:
      grams = value * 1000;
      break;
    case MessurementTypes.G:
      grams = value;
      break;
    case MessurementTypes.KG:
      grams = value * 1000;
      break;
    case MessurementTypes.PIECES:
      grams = value;
      break;
    case MessurementTypes.CUPS:
      grams = value * 236.588;
      break;
    case MessurementTypes.TABLESPOONS:
      grams = value * 14.3;
      break;
    case MessurementTypes.TEASPOONS:
      grams = value * 4.2;
      break;
    case MessurementTypes.OUNCES:
      grams = value * 28.3495;
      break;
    case MessurementTypes.POUNDS:
      grams = value * 453.592;
      break;
    case MessurementTypes.MILLIGRAMS:
      grams = value / 1000;
      break;
    case MessurementTypes.GRAMS:
      grams = value;
      break;
    case MessurementTypes.KILOGRAMS:
      grams = value * 1000;
      break;
    case MessurementTypes.MILLILITERS:
      grams = value;
      break;
    case MessurementTypes.LITERS:
      grams = value * 1000;
      break;
  }

  // Convert from grams
  let result = 0;
  switch (to) {
    case MessurementTypes.ML:
      result = grams;
      break;
    case MessurementTypes.L:
      result = grams / 1000;
      break;
    case MessurementTypes.G:
      result = grams;
      break;
    case MessurementTypes.KG:
      result = grams / 1000;
      break;
    case MessurementTypes.PIECES:
      result = grams;
      break;
    case MessurementTypes.CUPS:
      result = grams / 236.588;
      break;
    case MessurementTypes.TABLESPOONS:
      result = grams / 14.3;
      break;
    case MessurementTypes.TEASPOONS:
      result = grams / 4.2;
      break;
    case MessurementTypes.OUNCES:
      result = grams / 28.3495;
      break;
    case MessurementTypes.POUNDS:
      result = grams / 453.592;
      break;
    case MessurementTypes.MILLIGRAMS:
      result = grams * 1000;
      break;
    case MessurementTypes.GRAMS:
      result = grams;
      break;
    case MessurementTypes.KILOGRAMS:
      result = grams / 1000;
      break;
    case MessurementTypes.MILLILITERS:
      result = grams;
      break;
    case MessurementTypes.LITERS:
      result = grams / 1000;
      break;
  }

  return result;
};
export const convertToFood = (food: any) => {

};
