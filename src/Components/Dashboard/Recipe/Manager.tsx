//List, managing a list / -> edit / del / on click open detailed view
// modal: edit, add recipes/ edits / del / on save either to detailed view or to dashboard

import { Button, Group, Stack, TextInput } from "@mantine/core";
import { RecipeList } from "./List";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { IRecipe, createEmptyRecipe } from "../../../Interfaces/Recipe";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { RecipeFormModal } from "./FormModal";
import { useState } from "react";

// need for
export function RecipeManager() {
    const [opened, { open, close }] = useDisclosure(false);
    const [search, setSearch] = useInputState<string>("");
    const [editData, setEditData] = useState<IRecipe>(createEmptyRecipe());
    const openEdit = (recipe: IRecipe) => {
        setEditData(recipe);
        open();
    };
    //const [filter, setFilter] = useState("");
    //<TextInput about="search your recipe" onChange={(v) => {setFilter(v.currentTarget.value) }} />
    //TODO make add button always visible when scrolling
    return (
        <Stack id="Recipes">
            <Group id="RecipeHeader" justify="center" grow={true}>
                <Button onClick={() => openEdit(createEmptyRecipe())}>
                    <IconPlus />
                </Button>
                <TextInput  title="search" rightSection={<IconSearch />} onChange={(v) => setSearch(v)}/>
            </Group>
            <RecipeList openEdit={openEdit} filter={search}/>
            <RecipeFormModal opened={opened} close={close} data={editData} />
        </Stack>
    );
}
