import { IImpexList } from "./ImpexList";
import { IMeal } from "./Meal";
import { IRecipe } from "./Recipe";
import { IUserData } from "./UserData";
//import { IUserSettings } from "./UserSettings";

//LATER make promises for database access 
export interface IDataService {
    GetUserData(requestList: IImpexList | undefined): IUserData
    setUserData(data: IUserData): boolean;

    GetRecipes(): IRecipe[],
    AddRecipe(recipe: IRecipe): boolean,
    UpdateRecipe(recipe: IRecipe): boolean,
    DeleteRecipe(id: number): IRecipe[],

    GetMeals(): IMeal[],
    AddMeals(meals: IMeal | IMeal[]): boolean,
    UpdateMeal(meal: IMeal): boolean,
    DeleteMeal(id: number): IMeal[]
    //GetUserSettings(): IUserSettings,
    //UpdateUserSettings(userSettings: IUserSettings): boolean
}