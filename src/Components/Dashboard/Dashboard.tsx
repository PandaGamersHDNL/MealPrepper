import { Group, Stack } from "@mantine/core";
import { ExportButton } from "./Export";
import { ImportButton } from "./Import";
import { IngredientsManager } from "./Ingredients/Manager";
import { MealManager } from "./Meal/Manager";
import { RecipeManager } from "./Recipe/Manager";

export function Dashboard() {
    return (
        <Group justify="center" align="flex-start" grow={true}>
            <Stack>
                <ExportButton />
                <ImportButton />
            </Stack>
            <MealManager />
            <RecipeManager />
            <IngredientsManager />
        </Group>
    );
}
