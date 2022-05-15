/*Define all constants*/
export const DATE_FORMAT = "YYYY/MM/DD";

export const ORDERLINE_HEADER_DATA = [
    { header: "Name", data: "customer.firstName" },
    { header: "Number", data: "number" },
    { header: "Promo Name", data: "promo.promoName" },
    { header: "Price", data: "price" },
    { header: "Provider Name", data: "promo.provider.providerName" },
    { header: "Status", data: "status" },
    { header: "Created At", data: "createdAt" },
    { header: "Updated At", data: "updatedAt" }
]

export const CUSTOMER_HEADER_DATA = [
    { header: "First Name", data: "firstName" },
    { header: "Last Name", data: "lastName" },
    { header: "Middle Name", data: "middleName" },
    { header: "Address", data: "address" },
    { header: "Contact No", data: "contactNo" },
    { header: "Gender", data: "gender" },
    { header: "Created At", data: "createdAt" },
    { header: "Updated At", data: "updatedAt" }
]

export const DEFAULT_ORDERLINE_SORT_ITEM = "customer.firstName"
export const DEFAULT_CUSTOMER_SORT_ITEM = "firstName"