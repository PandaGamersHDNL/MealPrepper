import { Button, Group, Stack } from "@mantine/core";
import { MealModal } from "./Modal";
import { useDisclosure } from "@mantine/hooks";
import { MealList } from "./List";
import { GroceryListManager } from "../GroceryList/Manager";

export function MealManager() {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <Stack >
            <Group grow={true}>
                <Button onClick={open}>generate meals</Button>
                <GroceryListManager />
            </Group>
            <MealList />
            <MealModal opened={opened} Close={close} />
        </Stack>
    );
}
