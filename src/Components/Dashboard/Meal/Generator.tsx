import { Button, Group } from "@mantine/core";
import { MealGeneratorModal } from "./GeneratorModal";
import { useDisclosure } from "@mantine/hooks";

export function MealGenerator() {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Group>
                <Button onClick={open}>generate meals</Button>
                <MealGeneratorModal opened={opened} Close={close}/>
            </Group>
        </>
    )
}