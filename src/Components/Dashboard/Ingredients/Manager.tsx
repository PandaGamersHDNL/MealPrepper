import { Button, Group } from "@mantine/core";
import { IngrList } from "./List";
import { useDisclosure } from "@mantine/hooks";
import { IngrModal } from "./Modal";
import { useState } from "react";
import { IIngredient, createEmptyIngr } from "../../../Interfaces/Ingredient";

export function IngrManager() {
    const [opened, { open, close }] = useDisclosure(false);
    const [edit, setEdit] = useState<IIngredient>(createEmptyIngr());
    const openEdit = (ingr: IIngredient) => { setEdit(ingr); open(); }

    return (
        <>
            <Group>
                <Button onClick={open}>generate meals</Button>
                <IngrModal opened={opened} Close={close} data={edit}/>
                <IngrList openEdit={openEdit}/>
            </Group>
        </>
    )
}


    
