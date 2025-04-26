import { Button, Group, Modal } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Form, useForm } from "@mantine/form";
import { useContext, useState } from "react";
import { IIngredientValue } from "../../../Interfaces/Ingredient";
import { GenGroceryList } from "../../../Services/GroceryListGen";
import { UserDataCTX } from "../../../App";

export function GroceryModal(props: {isOpen: boolean, onClose: () => void}) {
    const [isOpen2, setIsOpen2] = useState(false);

    const form = useForm<{ start: Date; end: Date }>();
    const DataManager = useContext(UserDataCTX)!.dataManager;
    const ingredients = DataManager.GetIngredients();
    const [GroceryList, SetGroceryList] = useState<IIngredientValue[]>([]);
    return (
        <><Modal opened={props.isOpen} onClose={props.onClose}>
            <Form form={form} onSubmit={(data) => {
                SetGroceryList(GenGroceryList(DataManager, data.start, data.end));
                setIsOpen2(true);
            } }>
                <DateInput {...form.getInputProps("start")} />
                <DateInput {...form.getInputProps("end")} />
                <Button type="submit" />
            </Form>
        </Modal><Modal opened={isOpen2} onClose={() => setIsOpen2(false)}>
                {GroceryList.map((ingrVal, index) => { 
                    const ingr = ingredients.find(v => v.id == ingrVal.IngredientId);
                    if(!ingr)
                        return <></>;
                    
                    return (<Group id={"GroceryLi" + index}>{ingr.name} {ingrVal.value} {ingr.messure}</Group>); 
                    })}
            </Modal>
            </>
    );
}
