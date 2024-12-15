import { Button, Group } from "@mantine/core";
import { IngredientList } from "./List";
import { IngredientsModal } from "./FormModal";
import { useDisclosure } from "@mantine/hooks";

export function IngredientsManager() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Group>
            <Button onClick={open}></Button>
            <IngredientList />
            <IngredientsModal close={close} opened={opened} />
        </Group>
    );
}
