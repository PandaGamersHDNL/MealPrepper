import { ExportButton } from "./Export";
import { ImportButton } from "./Import";
import { IngrManager } from "./Ingredients/Manager";
import { MealManager } from "./Meal/Manager";
import { RecipeManager } from "./Recipe/Manager";

export function Dashboard() {
    return (
        <>
            <ExportButton/>
            <ImportButton/>
            <MealManager />
            <RecipeManager/>
            <IngrManager />
        </>
    )
}