import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { operations as orderPageOperations } from './state';
import OrderTable from '../../components/TableTemplate';
import { Row, Col, Card, Container } from 'react-bootstrap';
import lodash from 'lodash'
import { ModalTemplate as AddOrderModal } from '../../components/ModalTemplate'
import { ModalTemplate as ViewOrderModal } from '../../components/ModalTemplate'
import { ModalTemplate as DeleteOrderModal } from '../../components/ModalTemplate'
import { FormControlTemplate as OrderAddForm } from '../../components/FormControlTemplate'
import { FormControlTemplate as OrderEditForm } from '../../components/FormControlTemplate'

const OrderPage = () => {

    const dispatch = useDispatch();
    const isInitialMount = useRef(true);

    const tableHeaderReducer = useSelector(state => state.orderPage.table.tableHeader)
    const tableColumnsReducer = useSelector(state => state.orderPage.table.tableColumns)
    const collapseSidebar = useSelector(state => state.landingePage.collapseSidebar)

    const [orderData, setOrderData] = useState([])
    const [pageInput, setPageInput] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [query, setQuery] = useState("")
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [isResultLoading, setIsResultLoading] = useState(false)
    const [sortItem, setSortItem] = useState("customer.firstName")
    const [sortDirection, setSortDirection] = useState("Ascending")
    const [showAddOrderModal, setShowAddOrderModal] = useState(false)
    const [showViewOrderModal, setShowViewOrderModal] = useState(false)
    const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false)
    const [forInlineDeletion, setForInlineDeletion] = useState("")
    const [editDisabled, setEditDisabled] = useState(true)
    const [isClickedClear, setIsClickedClear] = useState(false)

    const [customerSearchQuery, setCustomerSearchQuery] = useState("")
    const [promoSearchQuery, setPromoSearchQuery] = useState("")
    const [providerSearchQuery, setProviderSearchQuery] = useState("")
    const [customerId, setCustomerId] = useState("")
    const [promoId, setPromoId] = useState("")
    const [providerId, setProviderId] = useState("")
    const [fullName, setFullname] = useState("")
    const [number, setNumber] = useState("")
    const [orderCode, setOrderCode] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [promoName, setPromoName] = useState("")
    const [price, setPrice] = useState("")
    const [providerName, setProviderName] = useState("")
    const [status, setStatus] = useState("")
    const [orderNumber, setOrderNumber] = useState("")
    const [customerChoices, setCustomerChoices] = useState("")
    const [promoChoices, setPromoChoices] = useState("")
    const [providerChoices, setProviderChoices] = useState("")
    const [statusMeaning, setStatusMeaning] = useState("")

    const initialStateForm = () => {
        setOrderCode("")
        setCreatedAt("")
        setPromoName("")
        setPrice("")
        setProviderName("")
        setStatus("")
        setOrderNumber("")
        setFullname("")
        setCustomerId("")
        setNumber("")
        setPromoId("")
        setProviderId("")
        setPrice("")
        setStatusMeaning("")
    }

    // modal
    const handleEditDisabled = () => setEditDisabled(!editDisabled)
    const handleOpenAddOrderModal = () => setShowAddOrderModal(true)
    const handleCloseAddOrderModal = () => {
        setShowAddOrderModal(false)

        initialStateForm()
    }
    const handleOpenViewOrderModal = (e) => {
        setShowViewOrderModal(true)

        setOrderCode(e.orderCode)
        setCreatedAt(e.createdAt)
        setPromoName(e.promoName)
        setPrice(e.price)
        setProviderName(e.providerName)
        setStatus(e.status)
        setOrderNumber(e.orderlineId)
        setFullname(e.name)
        setProviderId(e.providerId)
        setCustomerId(e.customerId)
        setPromoId(e.promoId)
        setNumber(e.number)
        setStatusMeaning(e.statusMeaning)
    }
    const handleCloseViewOrderModal = () => {
        setShowViewOrderModal(false)

        initialStateForm()
        setEditDisabled(true)
    }
    const handleCloseDeleteOrderModal = () => setShowDeleteOrderModal(false)

    // pagination
    const handleNext = () => setPageInput(parseInt(pageInput) + 1)
    const handlePrev = () => setPageInput(parseInt(pageInput) - 1)
    const handleLastPage = () => setPageInput(totalPages)
    const handleFirstPage = () => setPageInput(1)

    // table search
    const handleAutoComplete = (e) => setQuery(e.target.value)

    const submitForm = () => {
        let payload = {
            searchQuery: query,
            sortDirection: sortDirection,
            sortItem: sortItem,
            itemsPerPage: itemsPerPage,
            pageInput: pageInput,
        };

        dispatch(orderPageOperations.listOrders(payload))
            .then((response) => {
                setOrderData(response.data)
                setTotalPages(response.totalPages)
            })
    }

    const handleCurrentPage = (e) => {
        if ('' === e.target.value) {
            setPageInput(e.target.value)
        }
        else {
            const re = /^[0-9\b]+$/;
            if (re.test(e.target.value)) {
                if (e.target.value <= totalPages && e.target.value >= 1) {
                    setPageInput(parseInt(e.target.value))
                }
            }
        }
    }

    const handleSortClick = (header) => {

        //TODO: Revisit this again to revise for optimization.
        let refinedeHeader = ""

        header === "Name" ? refinedeHeader = "customer.firstName" : refinedeHeader = lodash.camelCase(header)
        let tempSortDirection = ""

        sortDirection === "Ascending" ? tempSortDirection = "Descending" : tempSortDirection = "Ascending";

        setSortItem(refinedeHeader)
        setSortDirection(tempSortDirection)
    }

    const handleItemPerPageSelect = (event) => {
        setItemsPerPage(parseInt(event))
        setPageInput(1)
    }

    const handleDeleteOrder = () => {
        let payload = {
            orderlineId: forInlineDeletion
        }

        dispatch(orderPageOperations.deleteOrders(payload))
            .then(() => {
                submitForm()
            })
        handleCloseDeleteOrderModal()
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        submitForm()
    }

    const handleNavigatePage = () => {

    }

    const handleCustomerInputChangeDropdown = (e) => {
        setCustomerSearchQuery(e)
        setFullname(e)
    }

    const handleCustomerInputSelectDropdown = (e) => {
        setCustomerId(e.value)
    }

    const handleProviderInputChangeDropdown = (e) => {
        setProviderSearchQuery(e)
    }

    const handleProviderInputSelectDropdown = (e) => {
        setProviderId(e.value)
    }

    const handlePromoInputChangeDropdown = (e) => {
        setPromoSearchQuery(e)
    }

    const handlePromoInputSelectDropdown = (e) => {
        setPromoId(e.value)
    }

    const handleStatusInputSelectDropdown = (e) => {
        setStatus(e.value)
    }

    const handleSaveOrder = () => {

        let payload = {
            orderlineId: orderNumber,
            orderCode: orderCode,
            promoId: promoId,
            customerId: customerId,
            status: status,
            number: number,
            price: price,
            updatedAt: new Date(),
            createdAt: new Date()
        }

        dispatch(orderPageOperations.saveOrders(payload))
            .then(() => {
                submitForm()
                initialStateForm()
            })
            .catch((e) => {
                //TODO: Add toast message
                console.log("Error: ", e)
            })
        setShowAddOrderModal(false)
    }

    const handleEditOrder = () => {
        let payload = {
            orderlineId: orderNumber,
            orderCode: orderCode,
            customerId: customerId,
            promoId: promoId,
            number: number,
            status: status,
            updatedAt: new Date(),
            price: price
        }

        dispatch(orderPageOperations.updateOrders(payload))
            .then(() => {
                submitForm()
                initialStateForm()
            })
            .catch((e) => {
                //TODO: Add toast message
                console.log("Error: ", e)
            })
        setShowViewOrderModal(false)
        setEditDisabled(true)
    }

    const handleClearForm = () => {
        setIsClickedClear(true)
        setQuery("")
    }

    const handleOpenDeleteOrderModal = (e) => {
        setShowDeleteOrderModal(true)
        setForInlineDeletion(e.orderlineId)
    }

    useEffect(() => {
        submitForm()
    }, []) //eslint-disable-line

    useEffect(() => {
        //prevent this block from running during mount.
        //all useEffect instances always run on mount. 
        //Need a checker to prevent mounting except for the blank ones.
        // isInitialMount.current ? isInitialMount.current = false : submitForm()
        if (isInitialMount.current) {
            isInitialMount.current = false
        }
        else {
            if (pageInput) {
                submitForm()
            }
        }

    }, [itemsPerPage, pageInput, sortItem, sortDirection]) //eslint-disable-line

    useEffect(() => {

        if (isClickedClear) {
            submitForm()
        }

        setIsClickedClear(false)
    }, [isClickedClear]) //eslint-disable-line

    useEffect(() => {

        let payload = {
            searchQuery: customerSearchQuery
        }

        dispatch(orderPageOperations.listCustomerNames(payload))
            .then((response) => {
                setCustomerChoices(response)
            })
            .catch((e) => {
                //TODO: Add toast message
                console.log("Error: ", e)
            })
    }, [customerSearchQuery]) //eslint-disable-line

    useEffect(() => {

        let payload = {
            searchQuery: promoSearchQuery,
            providerId: providerId
        }

        dispatch(orderPageOperations.listPromoNames(payload))
            .then((response) => {
                setPromoChoices(response)
            })
            .catch((e) => {
                //TODO: Add toast message
                console.log("Error: ", e)
            })
    }, [promoSearchQuery, providerId]) //eslint-disable-line

    useEffect(() => {

        let payload = {
            searchQuery: providerSearchQuery
        }

        dispatch(orderPageOperations.listProviderNames(payload))
            .then((response) => {
                setProviderChoices(response)
            })
            .catch((e) => {
                //TODO: Add toast message
                console.log("Error: ", e)
            })
    }, [providerSearchQuery]) //eslint-disable-line

    return (
        <>
            <div style={{ backgroundColor: "#f0f2f5" }} className={"mainContent " + (collapseSidebar ? "open-sidebar" : "close-sidebar")}>
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <OrderTable
                                    tableHeader={tableHeaderReducer}
                                    tableColumns={tableColumnsReducer}
                                    tableList={orderData.map((data) => {
                                        //TODO: Format strings
                                        data.updatedAt = data.updatedAt.split(".")[0].replace("T", " ")
                                        data.createdAt = data.createdAt.split(".")[0].replace("T", " ")

                                        return (data)
                                    })}
                                    rowButtons={[
                                        { variant: "btn btn-info", label: "View", onClick: ((e) => handleOpenViewOrderModal(e)) },
                                        { variant: "btn btn-danger", label: "Delete", onClick: ((e) => handleOpenDeleteOrderModal(e)) }
                                    ]}
                                    handleSortClick={(e) => handleSortClick(e)}
                                    handleOpenAddModal={() => handleOpenAddOrderModal()}
                                    pagination={{
                                        name: 'currentPage',
                                        id: 'currentPage',
                                        currentPage: pageInput,
                                        size: 'sm',
                                        type: "text",
                                        totalPages: totalPages,
                                        itemsPerPage: itemsPerPage,
                                        isResultLoading: isResultLoading,
                                        query: query,
                                        sortItem: sortItem,
                                        sortDirection: sortDirection,
                                        handleSearchSubmit: ((e) => handleSearchSubmit(e)),
                                        handleAutoComplete: ((e) => handleAutoComplete(e)),
                                        handleClearForm: (handleClearForm),
                                        onChange: ((e) => handleCurrentPage(e)),
                                        onKeyDown: (() => handleNavigatePage()),
                                        onClickNext: (() => handleNext()),
                                        onClickPrev: (() => handlePrev()),
                                        onClickLast: (() => handleLastPage()),
                                        onClickFirst: (() => handleFirstPage()),
                                        handleItemPerPageSelect: handleItemPerPageSelect
                                    }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <AddOrderModal
                handleCloseModal={() => handleCloseAddOrderModal()}
                showModal={showAddOrderModal}
                handleSuccess={() => handleSaveOrder()}
                title={"Add Order"}
                body={
                    <OrderAddForm
                        formRows={[
                            {
                                name: "Name", type: "select", data: { value: customerId, label: fullName },
                                dropdownChoices: customerChoices,
                                onInputChange: (handleCustomerInputChangeDropdown),
                                onChange: (handleCustomerInputSelectDropdown)
                            },
                            { name: "Number", type: "text", data: number, onChange: ((e) => setNumber(e.target.value)) },
                            {
                                name: "Provider Name", type: "select", data: { value: providerId, label: providerName },
                                dropdownChoices: providerChoices,
                                onInputChange: (handleProviderInputChangeDropdown),
                                onChange: (handleProviderInputSelectDropdown)
                            },
                            {
                                name: "Promo Name", type: "select", data: { value: promoId, label: promoName },
                                dropdownChoices: promoChoices,
                                onInputChange: (handlePromoInputChangeDropdown),
                                onChange: (handlePromoInputSelectDropdown)
                            },
                            { name: "Price", type: "text", data: price, onChange: ((e) => setPrice(e.target.value)) },
                            {
                                name: "Status", type: "select", data: { value: status, label: statusMeaning },
                                dropdownChoices: [
                                    { value: 1, label: "Completed" },
                                    { value: 2, label: "Ongoing" },
                                    { value: 3, label: "Failed" }
                                ],
                                onChange: (handleStatusInputSelectDropdown)
                            }
                        ]}
                    />
                }
            />
            < ViewOrderModal
                handleCloseModal={() => handleCloseViewOrderModal()}
                showModal={showViewOrderModal}
                title={"View Order"}
                handleDisabled={() => handleEditDisabled()}
                disabled={editDisabled}
                handleSuccess={() => handleEditOrder()}
                type={"view"}
                body={
                    <OrderEditForm
                        //TODO: temporary dropdown choices.
                        formRows={[
                            {
                                name: "Name", type: "select", disabled: editDisabled, data: { value: customerId, label: fullName },
                                dropdownChoices: customerChoices,
                                onInputChange: (handleCustomerInputChangeDropdown),
                                onChange: (handleCustomerInputSelectDropdown)
                            },
                            { name: "Number", type: "text", disabled: editDisabled, data: number, onChange: ((e) => setNumber(e.target.value)) },
                            {
                                name: "Provider Name", type: "select", disabled: editDisabled, data: { value: providerId, label: providerName },
                                dropdownChoices: providerChoices,
                                onInputChange: (handleProviderInputChangeDropdown),
                                onChange: (handleProviderInputSelectDropdown)
                            },
                            {
                                name: "Promo Name", type: "select", disabled: editDisabled, data: { value: promoId, label: promoName },
                                dropdownChoices: promoChoices,
                                onInputChange: (handlePromoInputChangeDropdown),
                                onChange: (handlePromoInputSelectDropdown)
                            },
                            { name: "Price", type: "text", disabled: editDisabled, data: price, onChange: ((e) => setPrice(e.target.value)) },
                            {
                                name: "Status", type: "select", disabled: editDisabled, data: { value: status, label: statusMeaning },
                                dropdownChoices: [
                                    { value: 1, label: "Completed" },
                                    { value: 2, label: "Ongoing" },
                                    { value: 3, label: "Failed" }
                                ],
                                onChange: (handleStatusInputSelectDropdown)
                            }
                        ]}
                    />
                }
            />
            <DeleteOrderModal
                handleCloseModal={() => handleCloseDeleteOrderModal()}
                handleSuccess={() => handleDeleteOrder()}
                showModal={showDeleteOrderModal}
                title={"Delete Order"}
                type={"notification"}
                body={"Are you sure you want to delete this record?"}
            />
        </>
    );
}

export default OrderPage;