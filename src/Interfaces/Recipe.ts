export interface IRecipe {
    title: string,
    totalTime?: number,
    prepTime?: number,
    cookTime?: number,
    ingredients?: string[],
    steps?: string[],
    description?: string
}

export function createEmptyRecipe():IRecipe {
    return {
        title: "",
        totalTime: undefined,
        prepTime: undefined,
        cookTime: undefined,
        ingredients: [],
        steps: [],
        description: undefined
    }
}