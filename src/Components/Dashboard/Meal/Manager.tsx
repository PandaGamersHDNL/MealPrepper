import { Button, Group, Stack } from "@mantine/core";
import { MealModal } from "./Modal";
import { useDisclosure } from "@mantine/hooks";
import { MealList } from "./List";
import { GroceryListManager } from "../GroceryList/Manager";
import { useContext } from "react";
import { UserDataCTX } from "../../../App";

export function MealManager() {
    const [opened, { open, close }] = useDisclosure(false);
    const DataManager = useContext(UserDataCTX)!.dataManager;
    //TODO update meals after deletion here so the list updates
    return (
        <Stack >
            <Group grow={true}>
                <Button onClick={open}>generate meals</Button>
                <GroceryListManager />
                <Button onClick={()=> {DataManager.DeleteAllMeals();}}>Clear all</Button>
            </Group>
            <MealList />
            <MealModal opened={opened} Close={close} />
        </Stack>
    );
}
