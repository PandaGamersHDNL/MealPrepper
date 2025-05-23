import { Button, Group, Modal, TagsInput, TextInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import {
    CreateEmptyIngredient,
    IIngredient,
} from "../../../Interfaces/Ingredient";
import { useContext, useEffect } from "react";
import { UserDataCTX } from "../../../App";

export function IngredientsModal(props: {
    close: (addMore: boolean, newIng?: IIngredient) => void;
    opened: boolean;
    data: IIngredient;
}) {
    const DataManager = useContext(UserDataCTX)!.dataManager;
    let bAddAndNew: boolean = false;
    const form = useForm<IIngredient>({
        initialValues: CreateEmptyIngredient(),
    });

    useEffect(() => {
        form.setValues((v) => {
            return { ...v, ...props.data };
        });
        console.log("setting new ingredient modal data", props.data);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    const tags = DataManager.GetTags().flatMap(v => v.name);
    return (
        <Modal
            onClose={() => props.close(false, undefined)}
            opened={props.opened}
            centered
            title={"Ingredient"}
        >
            <Form
                form={form}
                onSubmit={(value) => {
                    console.log(value);
                    let updated: IIngredient[] | undefined = undefined;
                    if (props.data?.id) {
                        DataManager.UpdateIngredient(value);
                    } else {
                        updated = DataManager.AddIngredients(value);
                    }
                    form.setValues(CreateEmptyIngredient());
                    const onclose = updated![updated!.length - 1] || undefined;
                    props.close(bAddAndNew, onclose);
                }}
                onReset={() => {
                    form.setValues(CreateEmptyIngredient());
                }}
            >
                <TextInput label="Name" {...form.getInputProps("name")} />
                <TextInput label="Messure" {...form.getInputProps("messure")} />
                <TagsInput
                    label="Tags"
                    data={tags}
                    onOptionSubmit={(v) => {
                        if (v == "") return;
                        let id =
                            DataManager.GetTags()!.find((i) => i.name == v)
                                ?.id || -1;
                        if (id < 0) {
                            //setNewIngrName(v);
                            console.info("tag created");
                            const newTags = DataManager.AddTag({ name: v });
                            id = newTags[newTags.length - 1].id!;
                            return;
                        }
                        form.insertListItem("tags", id.toString());
                        console.log("on option submit", v, id);
                        console.log(form.getValues())
                    }}
                    onRemove={(v) => {
                        console.log("removed", v);
                        const id = DataManager.GetTags().find(
                            (i) => i.name == v
                        )!.id!;
                        const index = form.values.tags!.findIndex(
                            (i) => i == id
                        );
                        form.removeListItem("tags", index);
                    }}
                    value={form.values.tags?.flatMap((v) => {
                        const tag = DataManager.GetTags().find(
                            (filter) => filter.id == v
                        );
                        console.log(form.values.tags);
                        console.log(tag);

                        return tag?.name || [];
                    })}
                ></TagsInput>
                <Group>
                    <Button type="reset">Reset</Button>
                    <Button onClick={() => props.close(false, undefined)}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={() => (bAddAndNew = false)}>
                        {props.data.id ? "Save" : "Add"}
                    </Button>
                    <Button type="submit" onClick={() => (bAddAndNew = true)}>
                        {props.data.id ? "Save + New" : "Add + New"}
                    </Button>
                </Group>
            </Form>
        </Modal>
    );
}
