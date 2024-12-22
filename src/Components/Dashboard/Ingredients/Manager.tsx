import { ActionIcon, Button, Group, rem } from "@mantine/core";
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
    return (
        <Group>
            <Group id="IngredientHeader" justify="center">
                <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => openEdit(CreateEmptyIngredient())}
                >
                    <IconPlus
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </Group>
            <IngredientList openEdit={openEdit} />
            <IngredientsModal close={close} opened={opened} data={editData} />
        </Group>
    );
}
