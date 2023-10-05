//List, managing a list / -> edit / del / on click open detailed view
// modal: edit, add recipes/ edits / del / on save either to detailed view or to dashboard

import { RecipeList } from "./List";

// need for
export function RecipeManager() {
    //add button, search bar
    //on recipe clicked open edit
    return (
        <div id="Recipes">
            <div id="RecipeHeader"></div>
            <RecipeList />

        </div>
    )
}