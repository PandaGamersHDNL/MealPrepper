import { IDataService } from "../Interfaces/DataService";
import { IImpexList } from "../Interfaces/ImpexList";
import { IIngredient } from "../Interfaces/Ingredient";
//import { IIngredient } from "../Interfaces/Ingredient";
import { IMeal } from "../Interfaces/Meal";
import { createEmptyRecipe, IRecipe } from "../Interfaces/Recipe";
import { ITag } from "../Interfaces/Tag";
import { IUserData } from "../Interfaces/UserData";

//TODO Make sure every function returns the new state of the items
//TODO verify everything works like it should
export class LocalDataService implements IDataService {
    //Next id
    private recipeId = 0;
    private mealId = 0;
    private ingredientId = 0;
    private tagId = 0;
    //names of the local storage item
    private static recipeName = "Recipes";
    private static mealName = "Meals";
    private static ingredientName = "Ingredients";
    private static tagName = "Tags";
    //private static ingreName = "Ingredients";
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
            this.mealId++;
        } catch {
            this.saveMeals();
        }
        const recipeData = window.localStorage.getItem(LocalDataService.recipeName);
        try {
            if (!recipeData) throw Error("no recipe data")
            this.UserData.Recipes = JSON.parse(recipeData)
            console.log("parse successfull");
            //find highest id
            this.UserData.Recipes!.forEach((v, i) => {
                if (v.id && v.id > this.recipeId) {
                    this.recipeId = v.id;
                }
                
                this.UserData.Recipes![i] = {...createEmptyRecipe(), ...v};
                
            })
            this.recipeId++;
            this.saveRecipes(UserData.Recipes);
        } catch {
            this.saveRecipes();
        }

        const ingredientData = window.localStorage.getItem(LocalDataService.ingredientName);
        try {
            if (!ingredientData) throw Error("no ingredient data");
            this.UserData.Ingredients = JSON.parse(ingredientData) as IIngredient[];
            console.log("parse successfull");
            //find highest id
            this.UserData.Ingredients!.forEach(v => {
                if (v.id && v.id > this.ingredientId) {
                    this.ingredientId = v.id;
                }
            })
            this.ingredientId++;
        } catch {
            this.saveIngredients();
        }

        const tagsData = window.localStorage.getItem(LocalDataService.tagName);
        try {
            if (!tagsData) throw Error("no ingredient data");
            this.UserData.Tags = JSON.parse(tagsData) as ITag[];
            console.log("parse successfull");
            //find highest id
            this.UserData.Tags!.forEach(v => {
                if (v.id && v.id > this.tagId) {
                    this.tagId = v.id;
                }
            })
            this.tagId++;
        } catch {
            this.saveTags();
        }

        //TODO init ingredients
        console.log("finished loading", Date.now());
    }
    GetTags(): ITag[] {
        return this.UserData.Tags || [];
    }
    
    AddTag(value: ITag): ITag[] {
        value.id = this.tagId++;
        this.UserData.Tags!.push(value);
        this.saveTags(this.UserData.Tags);
        return this.UserData.Tags!;
    }
    DelTag(id: number): ITag[] {
        console.info("deleting tag", id);
        const res = this.GetTags().filter((v)=> v.id != id);
        this.saveTags(res);
        return res;
    }
    DeleteAllMeals(): IMeal[] {
        this.UserData.Meals = [];
        this.saveMeals(this.UserData.Meals);
        return this.UserData.Meals;
    }
    GetIngredients(): IIngredient[] {
        return this.UserData.Ingredients || [];
    }
    AddIngredients(ingredients: IIngredient | IIngredient[]): IIngredient[] {
        let res = this.GetIngredients();
        console.debug("current", res);
        if(Array.isArray(ingredients)) {
            ingredients.map(v => v.id = this.ingredientId++);
            res = res.concat(ingredients);  
        } else {
            ingredients.id = this.ingredientId++;
            res.push(ingredients);
        }
        this.saveIngredients(res);
        console.debug("after save" ,res);
        
        return res;
    }
    UpdateIngredient(ingredient: IIngredient): IIngredient[] {
        const res = this.GetIngredients();
        const oldIndex = res.findIndex(v => ingredient.id == v.id);
        res[oldIndex] = ingredient;
        this.saveIngredients(res);
        return res
    }
    DeleteIngredient(id: number): IIngredient[] {
        console.info("deleting ingredient", id);
        const res = this.GetIngredients().filter((v)=> v.id != id);
        this.saveIngredients(res);
        return res;
    }

    //important for exporting
    GetUserData(requestList?: IImpexList): IUserData {
        if(!requestList) return this.UserData;
        const data: IUserData = {};
        if( requestList.Ingredients){
            data.Ingredients = this.GetIngredients();
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
        return this.UserData.Meals || [];
    }
    AddMeals(meal: IMeal | IMeal[]): IMeal[] {
        let res = this.GetMeals();
        console.debug("current", res);
        if(Array.isArray(meal)) {
            meal.map(v => v.id = this.mealId++);
            res = res.concat(meal);
            
        } else {
            meal.id = this.mealId++;
            res.push(meal);
        }
        this.saveMeals(res);
        console.debug("after save" ,res);
        
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
        const res = this.GetMeals().filter((v)=> v.id != id);
        this.saveMeals(res);
        return res;
    }
    DeleteRecipe(id: number): IRecipe[] {
        console.info("deleting recipe ", id);
        const res = this.GetRecipes().filter((v) => v.id != id);        
        console.log("del res" , res);
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
        console.log("saving recipes", recipes);
    }

    private saveMeals(meals: IMeal[] = []) {
        window.localStorage.setItem(LocalDataService.mealName, JSON.stringify(meals));
        console.log("saving meals");  
    }

    private saveIngredients(ingredients: IIngredient[] = []){
        window.localStorage.setItem(LocalDataService.ingredientName, JSON.stringify(ingredients));
        console.log("saving ingredients");
    }

    private saveTags(tags: ITag[] = []){
        window.localStorage.setItem(LocalDataService.tagName, JSON.stringify(tags));
        console.log("saving ingredients");
    }
}