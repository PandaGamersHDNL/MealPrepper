import { MealManager } from "./Meal/Manager";
import { RecipeManager } from "./Recipe/Manager";

export function Dashboard() {
    return (
        <>
            <MealManager />
            <RecipeManager/>
        </>
    )
}