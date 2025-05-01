import { ActionIcon, Button, Group, rem, Stack } from "@mantine/core";
import { IngredientList } from "./List";
import { IngredientsModal } from "./FormModal";
import { useDisclosure } from "@mantine/hooks";
import {
    CreateEmptyIngredient,
    IIngredient,
} from "../../../Interfaces/Ingredient";
import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";

export function IngredientsManager() {
    const [opened, { open, close }] = useDisclosure(false);
    const [editData, setEditData] = useState<IIngredient>(
        CreateEmptyIngredient()
    );
    const openEdit = (ingredient: IIngredient) => {
        setEditData(ingredient);
        open();
    };
    //make add button always visible when scrolling
    return (
        <Stack id="Recipes">
            <Group id="IngredientsHeader" justify="center" grow={true} >
                <Button
                    justify="center"
                    onClick={() => openEdit(CreateEmptyIngredient())}
                >
                    <IconPlus />
                </Button>
            </Group>
            <IngredientList openEdit={openEdit} />
            <IngredientsModal close={close} opened={opened} data={editData} />
        </Stack>
    );
}
