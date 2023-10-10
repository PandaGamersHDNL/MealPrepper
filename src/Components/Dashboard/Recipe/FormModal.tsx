import { Button, Group, Modal, ModalProps, TextInput, Textarea } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IRecipe, createEmptyRecipe } from "../../../Interfaces/Recipe";
import { useEffect } from "react";
import { DataManager } from "../../../main";

export function RecipeFormModal(props: { data: IRecipe, closeModal: () => void } & ModalProps) {
    const form = useForm<IRecipe>({ initialValues: createEmptyRecipe() });

    //console.log("test modal change", props.data)
    useEffect(() => {

        form.setValues((v) => { return { ...v, ...props.data } })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);
    return (
        <Modal {...props} centered title={"Recipe"} >
            <Form form={form} onSubmit={(value) => { 
                console.log(value); 
                if(props.data.id) {
                    DataManager.UpdateRecipe(value);
                } else {
                    DataManager.AddRecipe(value); 
                }
                props.closeModal();
            }} >
                <TextInput label="Title" {...form.getInputProps("title")} />
                <Textarea label="description" {...form.getInputProps("description")} />
                <Group justify="center" mt="xl">
                    <Button onClick={() =>{ props.closeModal();
                    }}>Cancel</Button>
                    <Button type="reset">Reset</Button>
                    <Button type="submit" >{props.data.id ? "save" : "add"}</Button>
                </Group>
            </Form>
        </Modal>

    )
}