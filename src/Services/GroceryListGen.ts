import { IDataService } from "../Interfaces/DataService";
import { IIngredientValue } from "../Interfaces/Ingredient";

export function GenGroceryList(dataManager: IDataService, start: Date, end: Date): IIngredientValue[]
{
    const ret: IIngredientValue[] = [];
    const validMeals = dataManager.GetMeals().filter(v => {return v.date > start && v.date < end});
    console.log("valid meals length", validMeals.length);
    validMeals.forEach(meal => {
        console.log("meal: ", meal.id, " ", meal.recipe.title, " ", meal.recipe.ingredients?.length);
        
        meal.recipe.ingredients?.forEach(ingr => {
            const found = ret.find(testIngr => testIngr.IngredientId == ingr.IngredientId);
            if(found)
            {
                found.value += ingr.value;
            } else { 
                ret.push(ingr);
            }
        })
    });
    console.log("grocery list generated: ", ret);
    return ret;
}