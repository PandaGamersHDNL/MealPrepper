import { IIngredient, IIngredientValue } from "./Ingredient"

export interface IRecipe {
    id?: number
    title?: string,
    totalTime?: number,
    prepTime?: number,
    cookTime?: number,
    ingredients?: IIngredientValue[],
    steps?: string[],
    description?: string,
    calories?: number,
    rating?: number
}

export function createEmptyRecipe():IRecipe {
    return {
        title: "",
        totalTime: undefined,
        prepTime: undefined,
        cookTime: undefined,
        ingredients: [],
        steps: [],
        description: ""
    }
}