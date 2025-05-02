import { ActionIcon, Group, Table, rem } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useContext } from "react";
import { UserDataCTX } from "../../../App";

export function MealList() {
    const userCtx = useContext(UserDataCTX)!;
    console.log("meal list update")
    const DataManager = userCtx.dataManager;
    const rows = DataManager.GetMeals().map((item) => {
        const recipe =  DataManager.GetRecipes().find((v) => v.id == item.recipeId);
        if(!recipe) return;
        return(<Table.Tr key={"mli"+ item.id}>
            <Table.Td>{item.date.toLocaleDateString()}</Table.Td>
            <Table.Td>{recipe.title}</Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray" disabled>
                        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red" onClick={()=> {userCtx.setUserData({ Meals: DataManager.DeleteMeal(item.id!)})}}>
                        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>);});
    //Title / cook time? / rating? / 
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>

                <Table.Td>Day</Table.Td>
                <Table.Td>Recipe</Table.Td>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )

}