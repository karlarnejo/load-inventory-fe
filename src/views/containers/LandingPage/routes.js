import { ROOT } from "../../../config/settings";
import RootPage from "./RootPage";

export const routes = [
    {
        label: "Home",
        path: ROOT,
        component: RootPage,
        exact: true,
        showNav: true //if true, displays the label in the mainHeader.js component
    }
]