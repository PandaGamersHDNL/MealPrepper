import { IDataService } from "../Interfaces/DataService";
import { IImpexList } from "../Interfaces/ImpexList";
//import { IIngredient } from "../Interfaces/Ingredient";
import { IMeal } from "../Interfaces/Meal";
import { IRecipe } from "../Interfaces/Recipe";
import { IUserData } from "../Interfaces/UserData";
//import { IUserSettings } from "../Interfaces/UserSettings";


export class LocalDataService implements IDataService {
    private recipeId = 0;
    private mealId = 0;
    //names of the local storage item
    private static recipeName = "Recipes";
    private static mealName = "Meals";
    constructor(private UserData: IUserData , private SetLocalData: React.Dispatch<React.SetStateAction<IUserData>>) {
        console.log("init local data", Date.now());

        const mealData = window.localStorage.getItem(LocalDataService.mealName);
        try {
            if (!mealData) throw Error("no meal data")
            this.UserData.Meals = JSON.parse(mealData)
            console.log("parse successfull");
            //find highest id
            this.UserData.Meals!.forEach(v => {
                if (v.id && v.id > this.mealId) {
                    this.mealId = v.id;
                }

                v.date = new Date(v.date)
            })
            this.recipeId++;
        } catch {
            this.saveMeals();
        }
        const recipeData = window.localStorage.getItem(LocalDataService.recipeName);
        try {
            if (!recipeData) throw Error("no recipe data")
            this.UserData.Recipes = JSON.parse(recipeData)
            console.log("parse successfull");
            //find highest id
            this.UserData.Recipes!.forEach(v => {
                if (v.id && v.id > this.recipeId) {
                    this.recipeId = v.id;
                }
            })
            this.recipeId++;
        } catch {
            this.saveRecipes();
        }
        console.log("finished loading", Date.now());
    }
    
    

    GetUserData(requestList: IImpexList | undefined): IUserData {
        const data: IUserData = {};
        if(!requestList || requestList.Ingredients){
            //GetIngredients()
        }
        if(!requestList || requestList.Meals){
            data.Meals = this.GetMeals();
        }
        if(!requestList || requestList.Recipes){
            data.Recipes = this.GetRecipes();
        }
        return data;
    }

    setUserData(data: IUserData): boolean {
        for(const [key, value] of Object.entries(data)) {
            localStorage.setItem(key,JSON.stringify(value));
        }
        this.SetLocalData(data);
        console.log(data);
        return true
    }

    GetMeals(): IMeal[] {
        return this.UserData.Meals!;
    }
    AddMeals(meal: IMeal | IMeal[]): boolean {
        //console.log(meal);

        if(Array.isArray(meal)) {
            meal.map(v => v.id = this.mealId++)
            this.UserData.Meals!.concat(meal)
        } else {
            meal.id = this.mealId++;
            this.UserData.Meals!.push(meal);
        }
        this.saveMeals();
        return true;
    }
    UpdateMeal(meal: IMeal): boolean {
        const oldIndex = this.UserData.Meals!.findIndex(v => meal.id == v.id);
        this.UserData.Meals![oldIndex] = meal;
        this.saveMeals();
        return true
    }
    DeleteMeal(id: number): IMeal[] {
        console.info("deleting meal", id);
        this.UserData.Meals = this.UserData.Meals!.filter((v) => v.id != id);
        this.saveMeals();
        return this.UserData.Meals;
    }
    DeleteRecipe(id: number): IRecipe[] {
        console.info("deleting recipe ", id);
        this.UserData.Recipes = this.UserData.Recipes!.filter((v) => v.id != id);
        this.saveRecipes();
        return this.UserData.Recipes;
    }

    GetRecipes(): IRecipe[] {
        return this.UserData.Recipes!;
        
    }
    AddRecipe(recipe: IRecipe): boolean {
        recipe.id = this.recipeId++
        this.UserData.Recipes!.push(recipe);
        this.saveRecipes();
        return true;
    }
    UpdateRecipe(recipe: IRecipe): boolean {

        const oldIndex = this.UserData.Recipes!.findIndex(v => recipe.id == v.id);
        this.UserData.Recipes![oldIndex] = recipe;
        this.saveRecipes();
        return true
    }

    private saveRecipes() {
        window.localStorage.setItem(LocalDataService.recipeName, JSON.stringify(this.UserData.Recipes));
    }

    private saveMeals() {
        window.localStorage.setItem(LocalDataService.mealName, JSON.stringify(this.UserData.Meals));
    }


}