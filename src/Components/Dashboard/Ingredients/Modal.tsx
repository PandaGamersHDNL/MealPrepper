import { Button, Group, Modal, TextInput } from "@mantine/core";
import { IIngredient, createEmptyIngr } from "../../../Interfaces/Ingredient";
import { Form, useForm } from "@mantine/form";
import { useContext, useEffect } from "react";
import { UserDataCTX } from "../../../App";

export function IngrModal(props: { opened: boolean, Close: () => void, data: IIngredient }) {
    const form = useForm<IIngredient>({ initialValues: createEmptyIngr() });
    const DataManager = useContext(UserDataCTX)!.dataManager;
    //console.log("test modal change", props.data)
    useEffect(() => {
        form.setValues((v) => { return { ...v, ...props.data } })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);
    return <>
        <Modal onClose={props.Close} opened={props.opened} title="Ingredient">
            <Form form={form} onSubmit={(value) => {
                console.log(value);
                if (props.data.id) {
                    DataManager.UpdateIngr(value);
                } else {
                    DataManager.AddIngr(value);
                }
                props.Close();
            }}>
                <TextInput label="Name" {...form.getInputProps("name")}/>
                <TextInput label="Messure" {...form.getInputProps("messure")}/>
                <Group justify="center" mt="xl">
                    <Button onClick={() => {
                        props.Close();
                    }}>Cancel</Button>
                    <Button type="reset">Reset</Button>
                    <Button type="submit" >{props.data.id ? "save" : "add"}</Button>
                </Group>
            </Form>
        </Modal>
    </>
}