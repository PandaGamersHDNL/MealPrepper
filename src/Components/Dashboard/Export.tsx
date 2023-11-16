import { Button, Group, Modal } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IUserData } from "../../Interfaces/UserData";
import { ExportService } from "../../Services/Export";

export function ExportButton() {
    const [opened, { open, close }] = useDisclosure(false);
    const formData = useForm<IUserData>();

    /* show modal
    // modal shows all the categories you can export (carefull of dependencies -> recipes depend on ingredients, meals depend on recipes)
    //you can only export something if the dependency is also exported
    //potentially allow for selective exporting of certain recipes, ingredients, meals etc */
    return (<Group>

        <Button onClick={open}>Export</Button>
        <Modal opened={opened} onClose={close} > 
            <Form form={formData} onSubmit={(data)=> { ExportService.ExportJSON(data)}}>
                <Button type="submit" >export</Button>
            </Form>
        </Modal>
    </Group>);
}