import { IDataService } from "../Interfaces/DataService";

export class MealScheduleGenService {
    //generate
    static GenMeals(DataManager: IDataService, days: number, startDate?: Date ) {
        console.log("generating for " + days + " days");
        const date = startDate || new Date();

        const recipes = DataManager.GetRecipes();
        if(recipes.length <= 0) {
            throw new Error("no recipes available")
        }
        for (let i = 0; i < days; i++) {
            const recipe = recipes[this.RandomInt(recipes.length)];
            const dateOfMeal = this.AddDays(date, i);
            DataManager.AddMeals({ date: dateOfMeal, recipe: recipe })
        }
        return DataManager.GetMeals();
    }

    static AddDays(date: Date, days: number) {
        date.setTime(date.getTime() + (days * 86400000)); //1 day = 86400000 ms
        return date;
    }
    //max not inclusive
    // min  inclusive
    static RandomInt(max: number, min = 0): number {
        const random = Math.floor(Math.random() * max) + min;
        console.log(random);
        
        return random
    }
}