import { IIngredientValue } from "./Ingredient"

export interface IRecipe {
    id?: number
    title?: string,
    tagIds?: number[],
    totalTime?: number,
    prepTime?: number,
    cookTime?: number,
    ingredients?: IIngredientValue[],
    steps?: string[],
    description?: string,
    calories?: number,
    rating?: number,
    servings?: number // a serving can be a cookie for cookies or a serving as in a plate of food
}

export function createEmptyRecipe():IRecipe {
    return {
        title: "",
        totalTime: undefined,
        prepTime: undefined,
        cookTime: undefined,
        tagIds: [],
        ingredients: [],
        steps: [],
        description: "",
        servings: 1
    }
}