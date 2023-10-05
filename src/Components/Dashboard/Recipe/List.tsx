import { ActionIcon, Group, Table, rem } from "@mantine/core"
import { IconPencil, IconTrash } from '@tabler/icons-react';

export function RecipeList() {
    const data: IRecipe[] = [{ title: "juice" }, { title: "spaghetti dfjla;h djfahlkjdfhlkja djhlkaf hlasjdf" }];
    const rows = data.map((item) => (
        <Table.Tr>
            <Table.Td>{item.title}</Table.Td>

            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray">
                        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red">
                        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>));
    //Title / cook time? / rating? / 
    return (
        <Table>
            <Table.Thead>
                <Table.Td>Title</Table.Td>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}

interface IRecipe {
    title: string,
    totalTime?: number,
    description?: string
}