import { IIngredient } from "./Ingredient";
import { IMeal } from "./Meal";
import { IRecipe } from "./Recipe";
import { ITag } from "./Tag";

export interface IUserData{
    Meals?: IMeal[],
    Recipes?: IRecipe[],
    Ingredients?: IIngredient[],
    Tags?: ITag[]
}