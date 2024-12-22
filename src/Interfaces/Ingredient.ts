export interface IIngredient {
    id?: number,
    name: string,
    messure: string //st or g or kg ...
    //TODO add tags
}

export interface IIngredientValue
{
    IngredientId: number
    value: number
}

export function CreateEmptyIngredient(): IIngredient {
    return {name: "", messure: "g"}
}