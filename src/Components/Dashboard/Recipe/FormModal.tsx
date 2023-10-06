import { Button, Modal, ModalProps, TextInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { IRecipe } from "../../../Interfaces/Recipe";
import { useEffect } from "react";

export function RecipeFormModal(props: { data: IRecipe} & ModalProps){
    const form = useForm<IRecipe>({initialValues: props.data}, onsubmit: ());
    form.onSubmit((value)=> {console.log(value);
    })
    //console.log("test modal change", props.data)
    useEffect(()=> {
        form.setValues(()=> props.data)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);
    return (
        <Modal {...props } centered draggable={true} title={"Recipe"}>
            <Form form={form}>
                <TextInput label="Title" {...form.getInputProps("title")}/>


                <Button>Cancel</Button><Button type="reset">Reset</Button><Button type="submit" >Save/add</Button>
            </Form>
        </Modal>
        
    )
}