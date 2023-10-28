import { MealGenerator } from "./Meal/Generator";
import { MealList } from "./Meal/List";
import { RecipeManager } from "./Recipe/Manager";

export function Dashboard() {
    return (
        <>
            <MealGenerator />
            <MealList/>
            <RecipeManager/>
        </>
    )
}