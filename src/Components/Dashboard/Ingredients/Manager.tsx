import { ActionIcon, Group, rem } from "@mantine/core";
import { IngrList } from "./List";
import { useDisclosure } from "@mantine/hooks";
import { IngrModal } from "./Modal";
import { useState } from "react";
import { IIngredient, createEmptyIngr } from "../../../Interfaces/Ingredient";
import { IconPlus } from "@tabler/icons-react";

export function IngrManager() {
    const [opened, { open, close }] = useDisclosure(false);
    const [editData, setEditData] = useState<IIngredient>(createEmptyIngr());
    const openEdit = (recipe: IIngredient) => { setEditData(recipe); open(); }
    //const [filter, setFilter] = useState("");
    //<TextInput about="search your recipe" onChange={(v) => {setFilter(v.currentTarget.value) }} />

    return (
        <div id="Recipes">
            <Group id="RecipeHeader" justify="center">
                <ActionIcon variant="subtle" color="red" onClick={() => openEdit(createEmptyIngr())}>
                    <IconPlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
            </Group>
            <IngrList openEdit={openEdit} />
            <IngrModal opened={opened} Close={close} data={editData} />
        </div>
    )
}
    
