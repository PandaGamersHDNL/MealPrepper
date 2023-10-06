import { RecipeManager } from "./Recipe/Manager";

export function Dashboard() {
    //const form = useForm();
    //const [opened, {open, close }] = useDisclosure(false);
    //TODO list or calendar for recipes
    //TODO add recipe
    //TODO manage recipe page?
    //TODO local storage https://mantine.dev/form/recipes/#save-form-values-to-local-storage
    /*<Modal opened={opened} onClose={close} withCloseButton={false}>
                <Form form={form}>
                    <TextInput label="Juice" />
                </Form>
            </Modal>
            <Button about="beep" name="boop" children="robot" onClick={open}/>*/
    return (
        <>
            <RecipeManager/>
        </>
    )
}