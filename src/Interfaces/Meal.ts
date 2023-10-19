import { IRecipe } from "./Recipe";

export interface Meal {
    recipe: IRecipe,
    date: Date, //TODO maybe string if time of day is defined by tag or number for exact times
    //tag to know if it's dinner lunch breakfast snack ...
}