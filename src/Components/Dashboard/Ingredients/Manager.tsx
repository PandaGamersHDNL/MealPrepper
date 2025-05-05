import { ActionIcon, Button, Group, rem, Stack, TextInput } from "@mantine/core";
import { IngredientList } from "./List";
import { IngredientsModal } from "./FormModal";
import { useDisclosure, useInputState } from "@mantine/hooks";
import {
    CreateEmptyIngredient,
    IIngredient,
} from "../../../Interfaces/Ingredient";
import { useState } from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";

export function IngredientsManager() {
    const [opened, { open, close }] = useDisclosure(false);
    const [search, setSearch] = useInputState<string>("");
    const [editData, setEditData] = useState<IIngredient>(
        CreateEmptyIngredient()
    );
    const openEdit = (ingredient: IIngredient) => {
        setEditData(ingredient);
        open();
    };
    //TODO make add button always visible when scrolling
    return (
        <Stack id="Recipes" >
            <Group id="IngredientsHeader" justify="center" grow={true} >
                <Button
                    justify="center"
                    onClick={() => openEdit(CreateEmptyIngredient())}
                >
                    <IconPlus />
                </Button>
                <TextInput  title="search" rightSection={<IconSearch />} onChange={(v) => setSearch(v)}/>
            </Group>
            <IngredientList openEdit={openEdit} filter={search}/>
            <IngredientsModal close={close} opened={opened} data={editData} />
        </Stack>
    );
}
