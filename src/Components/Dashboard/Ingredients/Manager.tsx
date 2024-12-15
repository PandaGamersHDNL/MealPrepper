import { Button, Group } from "@mantine/core";
import { IngredientList } from "./List";
import { IngredientsModal } from "./FormModal";
import { useDisclosure } from "@mantine/hooks";
import { CreateEmptyIngredient, IIngredient } from "../../../Interfaces/Ingredient";
import { useState } from "react";

export function IngredientsManager() {
    const [opened, { open, close }] = useDisclosure(false);
    const [editData, setEditData] = useState<IIngredient>(CreateEmptyIngredient());
    const openEdit = (ingredient: IIngredient) => { setEditData(ingredient); open(); }
    return (
        <Group>
            <Button onClick={() => openEdit(CreateEmptyIngredient())}></Button>
            <IngredientList openEdit={openEdit}/>
            <IngredientsModal close={close} opened={opened} data={editData} />
        </Group>
    );
}
