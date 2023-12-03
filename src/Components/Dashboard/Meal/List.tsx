import { ActionIcon, Group, Table, rem } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { DataManager } from "../../../main";
import { useState } from "react";
import { IMeal } from "../../../Interfaces/Meal";

export function MealList() {
    const [data, setData] = useState<IMeal[]>(DataManager.GetMeals());
    const rows = data.map((item) => (
        <Table.Tr key={"mli"+ item.id}>
            <Table.Td>{item.recipe.title}</Table.Td>
            <Table.Td>{item.date.toLocaleDateString()}</Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray" disabled>
                        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red" onClick={()=> {DataManager.DeleteMeal(item.id!); setData(DataManager.GetMeals());}}>
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

                <Table.Td>Recipe</Table.Td>
                <Table.Td>Day</Table.Td>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )

}