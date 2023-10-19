import { MealList } from "./Meal/List";
import { RecipeManager } from "./Recipe/Manager";

export function Dashboard() {
    return (
        <>
            <MealList/>
            <RecipeManager/>
        </>
    )
}