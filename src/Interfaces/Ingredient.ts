export interface IIngredient {
    id?: number,
    name?: string,
    messure?: string //$ or g or kg ...
}

export function createEmptyIngr():IIngredient {
    return {
       messure: "",
       name: ""
    }
}