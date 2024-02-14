import axios from "axios";

const searchFood = async (query: string) => {
  const response = await axios.get(
    `https://api.spoonacular.com/food/products/search?query=${query}&apiKey=${process.env.SPOONACULAR_API_KEY}`
  );
  return response.data;
};
