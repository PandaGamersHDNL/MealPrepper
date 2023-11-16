import { ExportButton } from "./Export";
import { MealManager } from "./Meal/Manager";
import { RecipeManager } from "./Recipe/Manager";

export function Dashboard() {
    return (
        <>
        <ExportButton/>
            <MealManager />
            <RecipeManager/>
        </>
    )
}