import { ActionIcon, Group, rem, Table } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useContext } from "react";
import { UserDataCTX } from "../../../App";
import { IIngredient } from "../../../Interfaces/Ingredient";

export function IngredientList(props: {
    openEdit: (recipe: IIngredient) => void, filter: string
}) {
    const userCtx = useContext(UserDataCTX)!;
    console.log("recipe list update");
    // TODO filter by tag
    // TODO filter by aphabet
    const DataManager = userCtx.dataManager;
    const data: IIngredient[] = userCtx.userData?.Ingredients || [];

    const rows = data!.filter((v) => v.name.toUpperCase().includes(props.filter.toUpperCase())).map((item) => (
        <Table.Tr key={"ii" + item.id}>
            <Table.Td>{item.name}</Table.Td>

            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={() => props.openEdit(item)}
                    >
                        <IconPencil
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() =>
                            userCtx.setUserData({
                                Ingredients: DataManager.DeleteIngredient(item.id!),
                            })
                        }
                    >
                        <IconTrash
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Td>Ingredient</Table.Td>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}
