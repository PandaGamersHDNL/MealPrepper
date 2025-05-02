import { IDataService } from "../Interfaces/DataService";
import { IIngredientValue } from "../Interfaces/Ingredient";

export function GenGroceryList(
  dataManager: IDataService,
  start: Date,
  end: Date
): IIngredientValue[] {
  const ret: IIngredientValue[] = [];
  const validMeals = dataManager.GetMeals().filter((v) => {
    return v.date >= start && v.date <= end;
  });
  console.log("valid meals length", validMeals.length);
  validMeals.forEach((meal) => {
    console.log("meal: ", meal.id, " ", meal.recipeId);
    const recipe = dataManager.GetRecipes().find((v) => v.id == meal.recipeId);
    if (!recipe) return;
    recipe.ingredients?.forEach((ingr) => {
      const found = ret.find(
        (testIngr) => testIngr.IngredientId == ingr.IngredientId
      );
      if (found) {
        found.value += ingr.value;
        if (found.date < meal.date) found.date = meal.date;
      } else {
        ingr.date = meal.date;
        ret.push(ingr);
      }
    });
  });
  console.log("grocery list generated: ", ret);
  return ret;
}
