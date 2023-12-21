import { Button, Group, Modal, TextInput, Textarea, InputLabel, NumberInput, Rating } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IRecipe, createEmptyRecipe } from "../../../Interfaces/Recipe";
import { useContext, useEffect } from "react";
import { UserDataCTX } from "../../../App";

export function RecipeFormModal(props: { data: IRecipe, close: () => void, opened: boolean }) {
    const form = useForm<IRecipe>({ initialValues: createEmptyRecipe() });
    const DataManager = useContext(UserDataCTX)!.dataManager;
    //console.log("test modal change", props.data)
    useEffect(() => {
        form.setValues((v) => { return { ...v, ...props.data } })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);
    return (
        <Modal onClose={props.close} opened={props.opened}  centered title={"Recipe"} >
            <Form form={form} onSubmit={(value) => {
                console.log(value);
                if (props.data.id) {
                    DataManager.UpdateRecipe(value);
                } else {
                    DataManager.AddRecipe(value);
                }
                props.close();
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
                        props.close();
                    }}>Cancel</Button>
                    <Button type="reset">Reset</Button>
                    <Button type="submit" >{props.data.id ? "save" : "add"}</Button>
                </Group>
            </Form>
        </Modal>

    )
}