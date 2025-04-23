import { Button, Group, Modal, TextInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import {
    CreateEmptyIngredient,
    IIngredient,
} from "../../../Interfaces/Ingredient";
import { useContext, useEffect } from "react";
import { UserDataCTX } from "../../../App";

export function IngredientsModal(props: {
    close: (newIng?: IIngredient) => void;
    opened: boolean;
    data: IIngredient;
}) {
    const DataManager = useContext(UserDataCTX)!.dataManager;
    let bAddAndNew: boolean = false;
    const form = useForm<IIngredient>({
        initialValues: CreateEmptyIngredient(),
    });

    useEffect(() => {
        form.setValues((v) => { return { ...v, ...props.data } })
        console.log("setting new ingredient modal data", props.data);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    return (
        <Modal
            onClose={props.close}
            opened={props.opened}
            centered
            title={"Ingredient"}
        >
            <Form
                form={form}
                onSubmit={(value) => {
                    console.log(value);
                    let updated :IIngredient[] | undefined = undefined;
                    if (props.data?.id) {
                        DataManager.UpdateIngredient(value);
                    } else {
                        updated = DataManager.AddIngredients(value);
                    }
                    form.setValues(CreateEmptyIngredient());
                    if(!bAddAndNew)
                    {
                        const onclose = updated![updated!.length-1] || undefined
                        props.close(onclose);
                    }
                }}
                onReset={() =>{
                    form.setValues(CreateEmptyIngredient());
                }}
                
            >
                <TextInput label="Name" {...form.getInputProps("name")} />
                <TextInput label="Messure" {...form.getInputProps("messure")} />
                <Group>
                    <Button type="reset">Reset</Button>
                    <Button onClick={()=>props.close()}>Cancel</Button>
                    <Button type="submit" onClick={()=> bAddAndNew = false}>{props.data.id ? "Save" : "Add"}</Button>
                    <Button type="submit" onClick={()=> bAddAndNew = true}>{props.data.id ? "Save" : "New"}</Button>
                </Group>
            </Form>
        </Modal>
    );
}
