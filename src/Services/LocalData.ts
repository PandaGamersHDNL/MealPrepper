import { IDataService } from "../Interfaces/DataService";
import { IMeal } from "../Interfaces/Meal";
import { IRecipe } from "../Interfaces/Recipe";
//import { IUserSettings } from "../Interfaces/UserSettings";


export class LocalDataService implements IDataService {
    private recipes: IRecipe[] = [];
    private meals: IMeal[] = [];
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
            this.recipes = JSON.parse(mealData)
            console.log("parse successfull");
            //find highest id
            this.meals.forEach(v => {
                if (v.id && v.id > this.mealId) {
                    this.mealId = v.id;
                }
            })
            this.recipeId++;
        } catch {
            this.saveMeals();
        }
        const recipeData = window.localStorage.getItem(LocalDataService.recipeName);
        try {
            if (!recipeData) throw Error("no recipe data")
            this.recipes = JSON.parse(recipeData)
            console.log("parse successfull");
            //find highest id
            this.recipes.forEach(v => {
                if (v.id && v.id > this.recipeId) {
                    this.recipeId = v.id;
                }
            })
            this.recipeId++;
        } catch {
            this.saveRecipes();
        }
        console.log("finished loading", Date.now());

        this.AddMeals()
    }
    GetMeals(): IMeal[] {
        return this.meals;
    }
    AddMeals(meal: IMeal | IMeal[]): boolean {
        if(Array.isArray(meal)) {
            meal.map(v => v.id = this.mealId++)
            this.meals.concat(meal)
        } else {
            meal.id = this.mealId++;
            this.meals.push(meal);
        }
        this.saveMeals();
        return true;
    }
    UpdateMeal(meal: IMeal): boolean {
        const oldIndex = this.meals.findIndex(v => meal.id == v.id);
        this.meals[oldIndex] = meal;
        this.saveMeals();
        return true
    }
    DeleteMeal(id: number): IMeal[] {
        console.info("deleting meal", id);
        this.meals = this.meals.filter((v) => v.id != id);
        this.saveMeals();
        return this.meals;
    }
    DeleteRecipe(id: number): IRecipe[] {
        console.info("deleting recipe ", id);
        this.recipes = this.recipes.filter((v) => v.id != id);
        this.saveRecipes();
        return this.recipes;
    }

    GetRecipes(): IRecipe[] {
        return this.recipes;
    }
    AddRecipe(recipe: IRecipe): boolean {
        recipe.id = this.recipeId++
        this.recipes.push(recipe);
        this.saveRecipes();
        return true;
    }
    UpdateRecipe(recipe: IRecipe): boolean {

        const oldIndex = this.recipes.findIndex(v => recipe.id == v.id);
        this.recipes[oldIndex] = recipe;
        this.saveRecipes();
        return true
    }

    private saveRecipes() {
        window.localStorage.setItem(LocalDataService.recipeName, JSON.stringify(this.recipes));
    }

    private saveMeals() {
        window.localStorage.setItem(LocalDataService.mealName, JSON.stringify(this.recipes));
    }


}