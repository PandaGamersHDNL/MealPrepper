import { Button, Group, Modal, NumberInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import {DateInput} from "@mantine/dates"
import { MealScheduleGenService } from "../../../Services/MealScheduleGen";
import { useContext } from "react";
import { UserDataCTX } from "../../../App";

export function MealModal(props: { opened: boolean, Close: () => void }) {
    const form = useForm<{ length: number, startDate: Date }>({ initialValues: { length: 7, startDate: new Date() } });
    const userDataCtx = useContext(UserDataCTX)!;
    
    return <>
        <Modal opened={props.opened} onClose={props.Close}>
            <Form form={form}>
                <NumberInput {...form.getInputProps("length")} label={"days"} />
                <DateInput {...form.getInputProps("startDate")} />
                <Group><Button onClick={() => {
                    try {

                        const meals = MealScheduleGenService.GenMeals(
                            userDataCtx.dataManager, 
                            form.values.length, 
                            form.values.startDate
                        );
                        userDataCtx.setUserData({Meals: meals})
                        props.Close();
                    } catch (m) {
                        alert(m)
                    }
                }}>Generate</Button></Group>
            </Form>
        </Modal>
    </>
}