import { IRecipe } from "./Recipe";
//import { IUserSettings } from "./UserSettings";

//LATER make promises for database access 
export interface IDataService {
    GetRecipes(): IRecipe[],
    AddRecipe(recipe: IRecipe): boolean,
    UpdateRecipe(recipe: IRecipe): boolean,
    DeleteRecipe(id: number): IRecipe[];
    //GetUserSettings(): IUserSettings,
    //UpdateUserSettings(userSettings: IUserSettings): boolean
}