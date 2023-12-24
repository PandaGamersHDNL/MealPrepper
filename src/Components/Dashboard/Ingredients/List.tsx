import { useContext } from "react";
import { UserDataCTX } from "../../../App";
import { ActionIcon, Group, Table, rem } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { IIngredient } from "../../../Interfaces/Ingredient";

export function IngrList(props: { openEdit: (recipe: IIngredient)=> void}) {
    const userCtx = useContext(UserDataCTX)!;
    console.log("ingr list update");
    
    const DataManager = userCtx.dataManager;
    const data = userCtx.userData.Ingredients!;
    const rows = data.map((item) => (
        <Table.Tr key={"ii"+ item.id}>
            <Table.Td>{item.name}</Table.Td>

            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray" onClick={()=> props.openEdit(item)}>
                        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red" onClick={()=> userCtx.setUserData({Ingredients: DataManager.DeleteIngr(item.id!)})}>
                        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>));
    //Title / unit?  
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