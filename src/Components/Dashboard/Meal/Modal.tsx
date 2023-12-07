import { Button, Group, Modal, NumberInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { MealScheduleGenService } from "../../../Services/MealScheduleGen";
import { useContext } from "react";
import { UserDataCTX } from "../../../App";

export function MealModal(props: { opened: boolean, Close: () => void }) {
    const form = useForm<{ length: number }>({ initialValues: { length: 7 } });
    const DataManager = useContext(UserDataCTX).dataManager;
    return <>
        <Modal opened={props.opened} onClose={props.Close}>
            <Form form={form}>
                <NumberInput {...form.getInputProps("length")} label={"days"} />
                <Group><Button onClick={() => {
                    try {

                        const meals = MealScheduleGenService.GenMeals(DataManager, form.values.length);
                        console.log(meals);

                        DataManager.AddMeals(meals);
                        props.Close();
                    } catch (m) {
                        alert(m)
                    }
                }}>Generate</Button></Group>
            </Form>
        </Modal>
    </>
}