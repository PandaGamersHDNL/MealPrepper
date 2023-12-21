import { Button, FileInput, Group, Modal } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { ImportService } from "../../Services/Import";
import { useContext } from "react";
import { UserDataCTX } from "../../App";
//import { IImpexList } from "../../Interfaces/ImpexList";

export function ImportButton() {
    //Deal with dublicates (in name) (if the names match maybe partly )
    //Deal with id dublicates (don't forget the dependencies)
    //allow full replace
    const [opened, { open, close }] = useDisclosure(false);
    const dataManager = useContext(UserDataCTX)!.dataManager;
    const formData = useForm<{file: File}>();

    /* show modal
    // modal shows all the categories you can export (carefull of dependencies -> recipes depend on ingredients, meals depend on recipes)
    //you can only export something if the dependency is also exported
    //potentially allow for selective exporting of certain recipes, ingredients, meals etc */
    return (<Group>

        <Button onClick={open}>Import</Button>
        <Modal opened={opened} onClose={close} > 
            <Form form={formData} onSubmit={async (list)=> { 
                ImportService.ImportJSON(dataManager, await list.file.text());
                close();
            }}>
                <FileInput  accept="json" {...formData.getInputProps("file")}></FileInput>
                <Button type="submit" >Import</Button>
            </Form>
        </Modal>
    </Group>);
}