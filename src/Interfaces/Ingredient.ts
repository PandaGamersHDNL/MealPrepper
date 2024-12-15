export interface IIngredient {
    id?: number,
    name: string,
    messure: string //$ or g or kg ...
    //TODO add tags
}

export function CreateEmptyIngredient(): IIngredient {
    return {name: "", messure: "g"}
}