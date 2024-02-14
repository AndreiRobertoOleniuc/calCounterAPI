import axios from "axios";

export const searchFood = async (query: string) => {
  const response = await axios.get(
    "https://api.nal.usda.gov/fdc/v1/foods/search",
    {
      params: {
        query,
        api_key: process.env.FOOD_API_KEY_USGOV,
        pageSize: 30,
        dataType: "Survey (FNDDS)",
      },
    }
  );
  return response.data;
};
