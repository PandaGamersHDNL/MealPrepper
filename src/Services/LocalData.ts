import { IDataService } from "../Interfaces/DataService";
import { IRecipe } from "../Interfaces/Recipe";
import { IUserSettings } from "../Interfaces/UserSettings";


export class LocalDataService implements IDataService {
    private recipes: IRecipe[] = [];
    private highestId= 0;
    constructor() {
        console.log("init local data",Date.now());
        
        const recipeData = window.localStorage.getItem("Recipes")
        try {
            if(!recipeData) throw Error("no recipe data")
            this.recipes = JSON.parse(recipeData)
            console.log("parse successfull");
            //find highest id
            this.recipes.forEach(v=> {
                if(v.id && v.id > this.highestId){
                    this.highestId = v.id;
                }
            })
            this.highestId++;
        } catch {  
            this.saveRecipes();
        }
        console.log("finished loading", Date.now());
        
    }
    DeleteRecipe(id: number): IRecipe[] {
        console.info("deleting ", id);
        console.log("before filter", this.recipes);
        
        this.recipes=this.recipes.filter((v)=> v.id != id);
        console.log("after filter", this.recipes);

        this.saveRecipes();
        return this.recipes;
    }

    GetRecipes(): IRecipe[] {
        return this.recipes;
    }
    AddRecipe(recipe: IRecipe): boolean {
        recipe.id = this.highestId++
        this.recipes.push(recipe);
        this.saveRecipes();
        return true;
    }
    UpdateRecipe(recipe: IRecipe): boolean {
        
        const oldIndex = this.recipes.findIndex(v=> recipe.id == v.id);
        this.recipes[oldIndex] = recipe;
        this.saveRecipes();
        return true
    }

    private saveRecipes(){
        window.localStorage.setItem("Recipes", JSON.stringify(this.recipes));
    }

   


}