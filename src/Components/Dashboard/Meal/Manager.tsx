import { Button, Group } from "@mantine/core";
import { MealModal } from "./Modal";
import { useDisclosure } from "@mantine/hooks";
import { MealList } from "./List";

export function MealManager() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Group>
                <Button onClick={open}>generate meals</Button>
                <MealList />
                <MealModal opened={opened} Close={close}/>
            </Group>
        </>
    )
}