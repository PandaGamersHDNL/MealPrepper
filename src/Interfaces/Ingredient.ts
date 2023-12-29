export interface IIngredient {
    id?: number,
    name?: string,
    messure?: string //$ or g or kg ...
    //TODO calories? how messured? (/ messure, /100 of)
}

export function createEmptyIngr():IIngredient {
    return {
       messure: "",
       name: ""
    }
}