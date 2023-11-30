import { IDataService } from "../Interfaces/DataService";
import { IImpexList } from "../Interfaces/ImpexList";
import { IIngredient } from "../Interfaces/Ingredient";
import { IMeal } from "../Interfaces/Meal";
import { IRecipe } from "../Interfaces/Recipe";
import { IUserData } from "../Interfaces/UserData";
//import { IUserSettings } from "../Interfaces/UserSettings";


export class LocalDataService implements IDataService {
    //TODO make 1 object -> IUserData?
    private Recipes: IRecipe[] = [];
    private Meals: IMeal[] = [];
    private Ingredients: IIngredient[] = [];
    private recipeId = 0;
    private mealId = 0;
    //names of the local storage item
    private static recipeName = "Recipes";
    private static mealName = "Meals";
    constructor() {
        console.log("init local data", Date.now());

        const mealData = window.localStorage.getItem(LocalDataService.mealName);
        try {
            if (!mealData) throw Error("no meal data")
            this.Meals = JSON.parse(mealData)
            console.log("parse successfull");
            //find highest id
            this.Meals.forEach(v => {
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
            this.Recipes = JSON.parse(recipeData)
            console.log("parse successfull");
            //find highest id
            this.Recipes.forEach(v => {
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
            console.log(value);
            localStorage.setItem(key,JSON.stringify(value));
            
        }
        console.log(data);
        return true
    }

    GetMeals(): IMeal[] {
        return this.Meals;
    }
    AddMeals(meal: IMeal | IMeal[]): boolean {
        //console.log(meal);

        if(Array.isArray(meal)) {
            meal.map(v => v.id = this.mealId++)
            this.Meals.concat(meal)
        } else {
            meal.id = this.mealId++;
            this.Meals.push(meal);
        }
        this.saveMeals();
        return true;
    }
    UpdateMeal(meal: IMeal): boolean {
        const oldIndex = this.Meals.findIndex(v => meal.id == v.id);
        this.Meals[oldIndex] = meal;
        this.saveMeals();
        return true
    }
    DeleteMeal(id: number): IMeal[] {
        console.info("deleting meal", id);
        this.Meals = this.Meals.filter((v) => v.id != id);
        this.saveMeals();
        return this.Meals;
    }
    DeleteRecipe(id: number): IRecipe[] {
        console.info("deleting recipe ", id);
        this.Recipes = this.Recipes.filter((v) => v.id != id);
        this.saveRecipes();
        return this.Recipes;
    }

    GetRecipes(): IRecipe[] {
        return this.Recipes;
        
    }
    AddRecipe(recipe: IRecipe): boolean {
        recipe.id = this.recipeId++
        this.Recipes.push(recipe);
        this.saveRecipes();
        return true;
    }
    UpdateRecipe(recipe: IRecipe): boolean {

        const oldIndex = this.Recipes.findIndex(v => recipe.id == v.id);
        this.Recipes[oldIndex] = recipe;
        this.saveRecipes();
        return true
    }

    private saveRecipes() {
        window.localStorage.setItem(LocalDataService.recipeName, JSON.stringify(this.Recipes));
    }

    private saveMeals() {
        window.localStorage.setItem(LocalDataService.mealName, JSON.stringify(this.Meals));
    }


}