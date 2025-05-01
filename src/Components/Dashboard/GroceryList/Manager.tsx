import { Button } from "@mantine/core";
import { GroceryModal } from "./Modal";
import { useState } from "react";

export function GroceryListManager()
{
    const [isOpen, setIsOpen] = useState(false);
    
    return (<>
        <Button onClick={() => setIsOpen(true)}>Grocery list</Button>
        <GroceryModal isOpen={isOpen} onClose={()=> setIsOpen(false)} />
    </>)
}