import { Modal } from "@mantine/core";
import { IIngredient } from "../../../Interfaces/Ingredient";

export function IngrModal(props: { opened: boolean, Close: () => void, data: IIngredient }) {
    return <>
    <Modal onClose={props.Close} opened={props.opened}>
    </Modal>
    </>
}