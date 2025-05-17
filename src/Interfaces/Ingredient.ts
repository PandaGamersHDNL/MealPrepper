export interface IIngredient {
  id?: number;
  name: string;
  messure: string; //st or g or kg ...
  tags: number[]
}

export interface IIngredientValue {
  IngredientId: number;
  value: number;
  date: Date;
}

export function CreateEmptyIngredient(): IIngredient {
  return { name: "", messure: "g", tags: [] };
}
