import { Button, Group, Modal } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { ExportService } from "../../Services/Export";
import { IImpexList } from "../../Interfaces/ImpexList";
import { useContext } from "react";
import { UserDataCTX } from "../../App";

export function ExportButton() {
    const [opened, { open, close }] = useDisclosure(false);
    const dataManager = useContext(UserDataCTX)!.dataManager;
    const formData = useForm<IImpexList>({initialValues: {Meals: true, Recipes: true, Ingredients: true}});

    /* show modal
    // modal shows all the categories you can export (carefull of dependencies -> recipes depend on ingredients, meals depend on recipes)
    //you can only export something if the dependency is also exported
    //potentially allow for selective exporting of certain recipes, ingredients, meals etc */
    return (<Group>

        <Button onClick={open}>Export</Button>
        <Modal opened={opened} onClose={close} > 
            <Form form={formData} onSubmit={(list)=> { console.log(list);
            ExportService.ExportListJSON(dataManager, list)}}>
                <Button type="submit" >export</Button>
            </Form>
        </Modal>
    </Group>);
}