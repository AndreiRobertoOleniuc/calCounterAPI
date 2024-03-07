export default interface USDAGOVFoodSearchResult {
  totalHits: number;
  currentPage: number;
  totalPages: number;
  pageList: number[];
  foodSearchCriteria: FoodSearchCriteria;
  foods: Food[];
  aggregations: Aggregations;
}

interface FoodSearchCriteria {
  dataType: string[];
  query: string;
  generalSearchInput: string;
  pageNumber: number;
  numberOfResultsPerPage: number;
  pageSize: number;
  requireAllWords: boolean;
  foodTypes: string[];
}

interface Food {
  fdcId: number;
  description: string;
  commonNames: string;
  additionalDescriptions: string;
  dataType: string;
  foodCode: number;
  publishedDate: string;
  foodCategory: string;
  foodCategoryId: number;
  allHighlightFields: string;
  score: number;
  microbes: any[];
  foodNutrients: FoodNutrient[];
  finalFoodInputFoods: FinalFoodInputFood[];
  foodMeasures: FoodMeasure[];
  foodAttributes: any[];
  foodAttributeTypes: FoodAttributeType[];
  foodVersionIds: any[];
}

interface FoodNutrient {
  nutrientId: number;
  nutrientName: string;
  nutrientNumber: string;
  unitName: string;
  value: number;
  rank: number;
  indentLevel: number;
  foodNutrientId: number;
}

interface FinalFoodInputFood {
  foodDescription: string;
  gramWeight: number;
  id: number;
  portionCode: string;
  portionDescription: string;
  unit: string;
  rank: number;
  srCode: number;
  value: number;
}

interface FoodMeasure {
  disseminationText: string;
  gramWeight: number;
  id: number;
  modifier: string;
  rank: number;
  measureUnitAbbreviation: string;
  measureUnitName: string;
  measureUnitId: number;
}

interface FoodAttributeType {
  name: string;
  description: string;
  id: number;
  foodAttributes: FoodAttribute[];
}

interface FoodAttribute {
  value: string;
  id?: number;
  name?: string;
  sequenceNumber?: number;
}

interface Aggregations {
  dataType: { [key: string]: number };
  nutrients: any; // Define more specifically if necessary
}
