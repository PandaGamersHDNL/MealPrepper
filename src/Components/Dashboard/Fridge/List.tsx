import { ActionIcon, Group, Table, rem } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useContext } from "react";
import { UserDataCTX } from "../../../App";

export function MealList() {
  const userCtx = useContext(UserDataCTX)!;
  const DataManager = userCtx.dataManager;
  const rows = userCtx.userData.Fridge.map((item) => (
    <Table.Tr key={"mli" + item.id}>
      <Table.Td>{item.recipe.title}</Table.Td>
      <Table.Td>{item.date.toLocaleDateString()}</Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray" disabled>
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => {
              userCtx.setUserData({ Meals: DataManager.DeleteMeal(item.id!) });
            }}>
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
  //Title / cook time? / rating? /
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Td>Ingredient</Table.Td>
          <Table.Td>Added at</Table.Td>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
