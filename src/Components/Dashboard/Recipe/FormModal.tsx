import { Button, Group, Modal, ModalProps, TextInput, Textarea, InputLabel, NumberInput, Rating } from "@mantine/core";
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
                if (props.data.id) {
                    DataManager.UpdateRecipe(value);
                } else {
                    DataManager.AddRecipe(value);
                }
                props.closeModal();
            }} >
                <TextInput label="Title" {...form.getInputProps("title")} />
                <Textarea label="Description" {...form.getInputProps("description")} />
                <Group>
                    <NumberInput suffix=" min" label="Total time" {...form.getInputProps("totalTime")} />
                    {/* <NumberInput suffix=" min" label="Preparation time" {...form.getInputProps("prepTime")} />
                    <NumberInput suffix=" min" label="Cooking time" {...form.getInputProps("cookTime")} />*/}
                </Group>
                <NumberInput suffix=" kcal" label="Calories" {...form.getInputProps("calories")}/>
                <Rating fractions={2} {...form.getInputProps("rating")}/>
                <Group justify="center" mt="xl" title="Ingredients">
                    <InputLabel > Ingredients</InputLabel>
                    {form.values.ingredients?.map((_, i) => (
                        <TextInput {...form.getInputProps(`ingredients.${i}`)} />
                    )

                    )}<br />
                    <Button onClick={() => form.insertListItem("ingredients", "")}>Add Ingredient</Button>
                </Group>
                <Group justify="center" mt="xl" title="Steps">
                    <InputLabel > Steps</InputLabel>
                    {form.values.steps?.map((_, i) => (
                        <TextInput {...form.getInputProps(`steps.${i}`)} />
                    )

                    )}<br />
                    <Button onClick={() => form.insertListItem("steps", "")}>Add step</Button>
                </Group>
                <Group justify="center" mt="xl">
                    <Button onClick={() => {
                        props.closeModal();
                    }}>Cancel</Button>
                    <Button type="reset">Reset</Button>
                    <Button type="submit" >{props.data.id ? "save" : "add"}</Button>
                </Group>
            </Form>
        </Modal>

    )
}