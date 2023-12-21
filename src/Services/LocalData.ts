import { IDataService } from "../Interfaces/DataService";
import { IImpexList } from "../Interfaces/ImpexList";
import { IIngredient } from "../Interfaces/Ingredient";
//import { IIngredient } from "../Interfaces/Ingredient";
import { IMeal } from "../Interfaces/Meal";
import { IRecipe } from "../Interfaces/Recipe";
import { IUserData } from "../Interfaces/UserData";
//import { IUserSettings } from "../Interfaces/UserSettings";

//Make sure every function returns the new state of the items
export class LocalDataService implements IDataService {
    private recipeId = 0;
    private mealId = 0;
    //names of the local storage item
    private static recipeName = "Recipes";
    private static mealName = "Meals";
    private static ingreName = "Ingredients";
    constructor(private UserData: IUserData) {
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

    //important for exporting
    GetUserData(requestList?: IImpexList): IUserData {
        if(!requestList) return this.UserData;
        const data: IUserData = {};
        if( requestList.Ingredients){
            //this.GetIngredients()
        }
        if( requestList.Meals){
            data.Meals = this.GetMeals();
        }
        if( requestList.Recipes){
            data.Recipes = this.GetRecipes();
        }
        return data;
    }
    //save?
    setUserData(data: IUserData): boolean {
        for(const [key, value] of Object.entries(data)) {
            localStorage.setItem(key,JSON.stringify(value));
        }
        console.log(data);
        return true
    }

    GetMeals(): IMeal[] {
        return this.UserData.Meals!;
    }
    AddMeals(meal: IMeal | IMeal[]): IMeal[] {
        //console.log(meal);
        const res = this.GetMeals();
        if(Array.isArray(meal)) {
            meal.map(v => v.id = this.mealId++);
            res.concat(meal);
        } else {
            meal.id = this.mealId++;
            res.push(meal);
        }
        this.saveMeals(res);
        return res;
    }
    UpdateMeal(meal: IMeal): IMeal[] {
        const res = this.GetMeals();
        const oldIndex = res.findIndex(v => meal.id == v.id);
        res[oldIndex] = meal;
        this.saveMeals(res);
        return res
    }
    DeleteMeal(id: number): IMeal[] {
        console.info("deleting meal", id);
        const res = this.GetMeals();
        res.filter((v)=> v.id != id);
        this.saveMeals(res);
        return res;
    }
    DeleteRecipe(id: number): IRecipe[] {
        console.info("deleting recipe ", id);
        const res = this.GetRecipes();
        res.filter(v => v != id);        
        this.saveRecipes(res);
        return res;
    }

    GetRecipes(): IRecipe[] {
        return this.UserData.Recipes!;
        
    }
    AddRecipe(recipe: IRecipe): IRecipe[] {
        recipe.id = this.recipeId++
        const res = this.GetRecipes();
        res.push(recipe);
        this.saveRecipes(res);
        return res;
    }
    UpdateRecipe(recipe: IRecipe): IRecipe[] {
        const res = this.GetRecipes();
        const oldIndex = res.findIndex(v => recipe.id == v.id);
        res[oldIndex] = recipe;
        this.saveRecipes(res);
        return res;
    }

    private saveRecipes(recipes: IRecipe[] =[]) {
        window.localStorage.setItem(LocalDataService.recipeName, JSON.stringify(recipes));
    }

    private saveMeals(meals: IMeal[] = []) {
        window.localStorage.setItem(LocalDataService.mealName, JSON.stringify(meals));
    }

    private saveIngredients(ingre: IIngredient[] = []) {
        window.localStorage.setItem(LocalDataService.ingreName, JSON.stringify(ingre));
    }
}