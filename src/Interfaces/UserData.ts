import { IIngredient } from "./Ingredient";
import { IMeal } from "./Meal";
import { IRecipe } from "./Recipe";

export interface IUserData{
    Meals: IMeal[],
    Recipes: IRecipe[],
    Ingredients: IIngredient[]
}