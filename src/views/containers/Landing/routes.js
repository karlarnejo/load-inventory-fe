import { ROOT } from "../../../config/settings";
import LandingPage from "./LandingPage";

export const routes = [
    {
        label: "Customer",
        path: ROOT,
        component: LandingPage,
        exact: true,
        showNav: true //if true, displays the label in the mainHeader.js component
    }
]