import { IDataService } from "../Interfaces/DataService";
import { IMeal } from "../Interfaces/Meal";
import { IRecipe } from "../Interfaces/Recipe";

export class MealScheduleGenService {
  //generate
  static GenMeals(
    DataManager: IDataService,
    days: number,
    startDate?: Date,
    noDube?: number
  ) {
    const date = startDate || new Date();
    console.log("generating for " + days + " days", date);

    const recipes = DataManager.GetRecipes();
    if (recipes.length <= 0) {
      throw new Error("no recipes available");
    }
    const genMeals: IMeal[] = [];
    for (let i = 0; i < days; i++) {
      const recipe = this.genValidRecipe(recipes, genMeals, i, noDube);
      const dateOfMeal = this.AddDays(new Date(date), i);
      genMeals.push({ date: dateOfMeal, recipeId: recipe.id! });
    }
    return DataManager.AddMeals(genMeals);
  }

  static AddDays(date: Date, days: number) {
    date.setTime(date.getTime() + days * 86400000); //1 day = 86400000 ms
    return date;
  }
  //max not inclusive
  // min  inclusive
  static RandomInt(max: number, min = 0): number {
    const random = Math.floor(Math.random() * max) + min;
    console.log(random);

    return random;
  }
  private static genValidRecipe(
    recipes: IRecipe[],
    meals: IMeal[],
    currentIndex: number,
    noDubes: number = 1
  ): IRecipe {
    if (noDubes >= recipes.length) noDubes = recipes.length - 1;
    const recipe = recipes[this.RandomInt(recipes.length)];
    for (let index = 0; index < meals.length; index++) {
      if (recipe.id == meals[index].recipeId)
        if (index + noDubes > currentIndex)
          return this.genValidRecipe(recipes, meals, currentIndex, noDubes);
    }

    return recipe;
  }
}
