import { ActionIcon, Group, Table, rem } from "@mantine/core"
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useContext } from "react";
import { UserDataCTX } from "../../../App";
import { IRecipe } from "../../../Interfaces/Recipe";

export function RecipeList(props: { openEdit: (recipe: IRecipe)=> void, filter: string}) {
    const userCtx = useContext(UserDataCTX)!;
    console.log("recipe list update");
        // TODO filter by tag
    // TODO filter by aphabet
    // TODO filter by stars
    // TODO filter by calories
    const DataManager = userCtx.dataManager;
    const data : IRecipe[] = userCtx.userData?.Recipes || [];
    const rows = data!.filter((v) => v.title?.toUpperCase().includes(props.filter.toUpperCase()))
                      .map((item) => (
        <Table.Tr key={"ri"+ item.id}>
            <Table.Td>{item.title}</Table.Td>

            <Table.Td>
                <Group justify="flex-end">
                    <ActionIcon variant="subtle" color="gray" onClick={()=> props.openEdit(item)}>
                        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red" onClick={()=> userCtx.setUserData({Recipes: DataManager.DeleteRecipe(item.id!)})}>
                        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>));
    //Title / cook time? / rating? / 
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>

                <Table.Td>Title</Table.Td>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}

