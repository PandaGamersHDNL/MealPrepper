import { IImpexList } from "./ImpexList";
import { IIngredient } from "./Ingredient";
import { IMeal } from "./Meal";
import { IRecipe } from "./Recipe";
import { IUserData } from "./UserData";
//import { IUserSettings } from "./UserSettings";

//LATER make promises for database access
export interface IDataService {
  GetUserData(requestList: IImpexList | undefined): IUserData;
  //TODO still required? internal? used for import
  setUserData(data: IUserData): boolean;

  GetRecipes(): IRecipe[];
  AddRecipe(recipe: IRecipe): IRecipe[];
  UpdateRecipe(recipe: IRecipe): IRecipe[];
  DeleteRecipe(id: number): IRecipe[];

  GetMeals(): IMeal[];
  AddMeals(meals: IMeal | IMeal[]): IMeal[];
  UpdateMeal(meal: IMeal): IMeal[];
  DeleteMeal(id: number): IMeal[];
  DeleteAllMeals(): IMeal[];

  GetIngredients(): IIngredient[];
  AddIngredients(ingredients: IIngredient | IIngredient[]): IIngredient[];
  UpdateIngredient(ingredient: IIngredient): IIngredient[];
  DeleteIngredient(id: number): IIngredient[];
/*
  GetFridge(): IIngredient[];
  AddFridge(value: IIngredient);
  UpdateFridge(value: IIngredient);
  DeleteFridge(value: IIngredient);

  GetTags(): ITag;
  AddTag(value: ITag);
  DelTag(id: number);*/
  //GetUserSettings(): IUserSettings,
  //UpdateUserSettings(userSettings: IUserSettings): boolean
}
