import { Meal } from "../Interfaces/Meal";
import { DataManager } from "../main";

export class MealScheduleGenService {
    //generate
    static GenMeals(days: number) {
        const recipes = DataManager.GetRecipes();
        const meals: Meal[] = [];
        for (let i = 0; i < days; i++) {
            const recipe = recipes[this.RandomInt(recipes.length)];
            const dateOfMeal = this.AddDays(new Date, i);
            meals.push({ date: dateOfMeal, recipe: recipe });
        }
        return meals;
    }

    static AddDays(date: Date, days: number) {
        date.setTime(date.getTime() + (days * 86400000)); //1 day = 86400000 ms
        return date;
    }
    //max not inclusive
    // min  inclusive
    static RandomInt(max: number, min = 0): number {
        const random = Math.floor(Math.random() * max) + min;
        return random
    }
}