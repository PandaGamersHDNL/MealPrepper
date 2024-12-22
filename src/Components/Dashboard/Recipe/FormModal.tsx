import {
    Button,
    Group,
    Modal,
    TextInput,
    Textarea,
    InputLabel,
    NumberInput,
    Rating,
    Select,
    ComboboxItem,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IRecipe, createEmptyRecipe } from "../../../Interfaces/Recipe";
import { useContext, useEffect } from "react";
import { UserDataCTX } from "../../../App";

export function RecipeFormModal(props: {
    data: IRecipe;
    close: () => void;
    opened: boolean;
}) {
    const form = useForm<IRecipe>({ initialValues: createEmptyRecipe() });
    const DataManager = useContext(UserDataCTX)!.dataManager;
    const globalData = useContext(UserDataCTX)!.userData;
    //console.log("test modal change", props.data)
    useEffect(() => {
        form.setValues((v) => {
            return { ...v, ...props.data };
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);
    const ingredients: ComboboxItem[] =
        globalData.Ingredients!.map<ComboboxItem>((v) => {
            return { value: v.id!.toString(), label: v.name + " (" + v.messure + ")" } as ComboboxItem;
        }) || [];
    const ingredientsValues = form.values.ingredients?.map<JSX.Element>((v, i) => {

        const ingr = globalData.Ingredients!.find((filter) => filter.id == v.IngredientId );
        if(!ingr) return<></>;
        return <NumberInput suffix={" " + ingr.messure} label={ingr.name} {...form.getInputProps(`ingredients.${i}.value`)} />
     }
     );
    return (
        <Modal
            onClose={props.close}
            opened={props.opened}
            centered
            title={"Recipe"}
        >
            <Form
                form={form}
                onSubmit={(value) => {
                    console.log(value);
                    if (props.data.id) {
                        DataManager.UpdateRecipe(value);
                    } else {
                        DataManager.AddRecipe(value);
                    }
                    props.close();
                }}
            >
                <TextInput label="Title" {...form.getInputProps("title")} />
                <Textarea
                    label="Description"
                    {...form.getInputProps("description")}
                />
                <Group>
                    <NumberInput
                        suffix=" min"
                        label="Total time"
                        {...form.getInputProps("totalTime")}
                    />
                    {/* <NumberInput suffix=" min" label="Preparation time" {...form.getInputProps("prepTime")} />
                    <NumberInput suffix=" min" label="Cooking time" {...form.getInputProps("cookTime")} />*/}
                </Group>
                <NumberInput
                    suffix=" kcal"
                    label="Calories"
                    {...form.getInputProps("calories")}
                />
                <Rating fractions={2} {...form.getInputProps("rating")} />
                <Group justify="center" mt="xl" title="Ingredients">
                    <InputLabel> Ingredients</InputLabel>
                    {ingredientsValues}
                    <br />
                    <Select
                        data={ingredients}
                        searchable
                        onChange={(v) => {
                            if (!v) return;
                            form.insertListItem("ingredients", {IngredientId: Number.parseInt(v), value: 100 });
                            console.log("selected", form.getValues());

                        }}
                    ></Select>
                    <Button
                        onClick={() => form.insertListItem("ingredients", "")}
                    >
                        Add Ingredient
                    </Button>
                </Group>
                <Group justify="center" mt="xl" title="Steps">
                    <InputLabel> Steps</InputLabel>
                    {form.values.steps?.map((_, i) => (
                        <TextInput {...form.getInputProps(`steps.${i}`)} />
                    ))}
                    <br />
                    <Button onClick={() => form.insertListItem("steps", "")}>
                        Add step
                    </Button>
                </Group>
                <Group justify="center" mt="xl">
                    <Button
                        onClick={() => {
                            props.close();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="reset">Reset</Button>
                    <Button type="submit">
                        {props.data.id ? "save" : "add"}
                    </Button>
                </Group>
            </Form>
        </Modal>
    );
}
