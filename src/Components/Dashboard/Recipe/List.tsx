import { ActionIcon, Group, Table, rem } from "@mantine/core"
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { IRecipe } from "../../../Interfaces/Recipe";
import { DataManager } from "../../../main";

export function RecipeList(props: {data: IRecipe[], openEdit: (recipe: IRecipe)=> void, updateRecipes: (recipe: IRecipe[]) => void}) {
    const data: IRecipe[] = props.data;
    const rows = data.map((item) => (
        <Table.Tr key={"ri"+ item.id}>
            <Table.Td>{item.title}</Table.Td>

            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray" onClick={()=> props.openEdit(item)}>
                        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red" onClick={()=> props.updateRecipes(DataManager.DeleteRecipe(item.id!))}>
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

