import { Button, Group, Modal, NumberInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { MealScheduleGenService } from "../../../Services/MealScheduleGen";
import { DataManager } from "../../../main";

export function MealGeneratorModal(props: { opened: boolean, Close: () => void }) {
    const form = useForm<{ length: number }>({ initialValues: { length: 7 } });
    return <>
        <Modal opened={props.opened} onClose={props.Close}>
            <Form form={form}>
                <NumberInput {...form.getInputProps("length")} label={"days"} />
                <Group><Button onClick={() => {
                    try {

                        const meals = MealScheduleGenService.GenMeals(form.values.length);
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