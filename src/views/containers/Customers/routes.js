import CustomerPage from "./CustomerPage";

export const routes = [
    {
        label: "Customer",
        path: "/customer",
        component: CustomerPage,
        exact: true,
        showNav: true //if true, displays the label in the mainHeader.js component
    }
]