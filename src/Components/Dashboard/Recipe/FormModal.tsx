import {
    Button,
    Group,
    Modal,
    TextInput,
    Textarea,
    InputLabel,
    NumberInput,
    Rating,
    Title,
    Stack,
    TagsInput,
    ComboboxStringItem,
    ActionIcon,
    rem,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IRecipe, createEmptyRecipe } from "../../../Interfaces/Recipe";
import { useContext, useEffect, useState } from "react";
import { UserDataCTX } from "../../../App";
import { IngredientsModal } from "../Ingredients/FormModal";
import {
    CreateEmptyIngredient,
    IIngredient,
} from "../../../Interfaces/Ingredient";
import { IconTrash } from "@tabler/icons-react";

export function RecipeFormModal(props: {
    data: IRecipe;
    close: () => void;
    opened: boolean;
}) {
    const form = useForm<IRecipe>({ initialValues: createEmptyRecipe() });
    const DataManager = useContext(UserDataCTX)!.dataManager;
    const globalData = useContext(UserDataCTX)!.userData;
    const [ingrOpened, setIngrOpened] = useState<boolean>(false);
    const [newIngrName, setNewIngrName] = useState<string>("");
    //console.log("test modal change", props.data)
    useEffect(() => {
        form.setValues((v: IRecipe) => {
            return { ...v, ...props.data };
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);
    const ingredients: ComboboxStringItem[] =
        globalData.Ingredients!.map((v) => {
            return { value: v.name };
        }) || [];
    console.log(form.values.ingredients);

    const ingredientsValues = form.values.ingredients!.map<JSX.Element>(
        (v, i) => {
            const ingr = globalData.Ingredients!.find(
                (filter) => filter.id == v.IngredientId
            );
            console.log("ingredient " + ingr);
            if (!ingr) return <></>;
            return (
                <Group>
                    <NumberInput
                        suffix={" " + ingr.messure}
                        label={ingr.name}
                        id={"RecipeIng" + i + ingr.id}
                        {...form.getInputProps(`ingredients.${i}.value`)}
                    />
                </Group>
            ); //TODO add indication of optional ingredients
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
                <Stack align="center" mt="xl" title="Ingredients">
                    <Title size="h1"> Ingredients</Title>
                    <TagsInput
                        data={ingredients}
                        onOptionSubmit={(v) => {
                            if (v == "") return;
                            const id =
                                DataManager.GetIngredients()!.find(
                                    (i) => i.name == v
                                )?.id || -1;
                            console.log("added ingr", id);
                            if (id < 0) {
                                setNewIngrName(v);
                                setIngrOpened(true);
                                return;
                            }
                            form.insertListItem("ingredients", {
                                IngredientId: id,
                                value: 100,
                            });
                            console.log("on option submit", v);
                        }}
                        onRemove={(v) => {
                            console.log("removed", v);
                            const id = DataManager.GetIngredients().find(
                                (i) => i.name == v
                            )!.id!;
                            const index = form.values.ingredients!.findIndex(
                                (i) => i.IngredientId == id
                            );
                            form.removeListItem("ingredients", index);
                        }}
                        value={form.values.ingredients?.flatMap(
                            (v) =>
                                globalData.Ingredients?.find(
                                    (filter) => filter.id == v.IngredientId
                                )?.name || []
                        )}
                    ></TagsInput>
                    {ingredientsValues}
                </Stack>
                <Stack align="center" mt="xl" title="Steps">
                    <InputLabel> Steps</InputLabel>
                    {form.values.steps?.map((_, i) => (
                        <Group>
                            <TextInput {...form.getInputProps(`steps.${i}`)} />
                            <ActionIcon variant="subtle" color="gray" onClick={() => form.removeListItem("steps", i)}>
                                <IconTrash
                                    style={{ width: rem(24), height: rem(24) }}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                        </Group>
                    ))}
                    <br />
                    <Button onClick={() => form.insertListItem("steps", "")}>
                        Add step
                    </Button>
                </Stack>
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
            <IngredientsModal
                close={(moreIngr: boolean, newIng?: IIngredient) => {
                    if (!moreIngr) setIngrOpened(false);
                    setNewIngrName("");
                    if (!newIng || !newIng.id) return;
                    form.insertListItem("ingredients", {
                        IngredientId: newIng?.id,
                        value: 100,
                    });
                }}
                opened={ingrOpened}
                data={{ ...CreateEmptyIngredient(), name: newIngrName }}
            />
        </Modal>
    );
}
