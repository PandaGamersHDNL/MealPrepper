//List, managing a list / -> edit / del / on click open detailed view
// modal: edit, add recipes/ edits / del / on save either to detailed view or to dashboard

import { ActionIcon, Group, rem } from "@mantine/core";
import { RecipeList } from "./List";
import { IconPlus } from "@tabler/icons-react";
import { IRecipe, createEmptyRecipe } from "../../../Interfaces/Recipe";
import { useDisclosure } from "@mantine/hooks";
import { RecipeFormModal } from "./FormModal";
import { useState } from "react";

// need for
export function RecipeManager() {
    const [opened, { open, close }] = useDisclosure(false);
    const [editData, setEditData] = useState<IRecipe>(createEmptyRecipe());
    const openEdit = (recipe: IRecipe) => { setEditData(recipe); open(); }
    //const [filter, setFilter] = useState("");
    //<TextInput about="search your recipe" onChange={(v) => {setFilter(v.currentTarget.value) }} />

    return (
        <div id="Recipes">
            <Group id="RecipeHeader" justify="center">
                <ActionIcon variant="subtle" color="red" onClick={() => openEdit(createEmptyRecipe())}>
                    <IconPlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
            </Group>
            <RecipeList openEdit={openEdit} />
            <RecipeFormModal opened={opened} close={close} data={editData} />
        </div>
    )
}