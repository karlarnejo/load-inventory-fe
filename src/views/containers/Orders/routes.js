import OrderPage from "./OrderPage";

export const routes = [
    {
        label: "Order",
        path: "/order",
        component: OrderPage,
        exact: true,
        showNav: true //if true, displays the label in the mainHeader.js component
    }
]