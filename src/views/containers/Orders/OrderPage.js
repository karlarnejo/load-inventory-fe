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

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [orderCode, setOrderCode] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [promoName, setPromoName] = useState("")
    const [price, setPrice] = useState("")
    const [providerName, setProviderName] = useState("")
    const [status, setStatus] = useState("")
    const [orderNumber, setOrderNumber] = useState("")

    const initialStateForm = () => {
        setFirstName("")
        setLastName("")
        setMiddleName("")
        setOrderCode("")
        setCreatedAt("")
        setPromoName("")
        setPrice("")
        setProviderName("")
        setStatus("")
        setOrderNumber("")
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

        setFirstName(e.firstName)
        setLastName(e.lastName)
        setMiddleName(e.middleName)
        setOrderCode(e.orderCode)
        setCreatedAt(e.createdAt)
        setPromoName(e.promoName)
        setPrice(e.price)
        setProviderName(e.providerName)
        setStatus(e.status)
        setOrderNumber(e.orderlineId)
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
                console.log("hee", response)
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
        const refinedeHeader = lodash.camelCase(header)
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

    const handlePromoNameDropdown = (e) => {
        setPromoName(e)
    }

    const handleProviderNameDropdown = (e) => {
        setProviderName(e)
    }

    const handleStatusDropdown = (e) => {
        setStatus(e)
    }

    const handleSaveOrder = () => {

        let payload = {
            orderlineId: orderNumber,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            orderCode: orderCode,
            promoName: promoName,
            price: price,
            providerName: providerName,
            status: status
        }

        dispatch(orderPageOperations.saveOrders(payload))
            .then(() => {
                submitForm()
                initialStateForm()
            })
            .catch((e) => {
                console.log("Error: ", e)
            })
        setShowAddOrderModal(false)
    }

    const handleEditOrder = () => {

        let payload = {
            orderlineId: orderNumber,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            orderCode: orderCode,
            promoName: promoName,
            price: price,
            providerName: providerName,
            status: status
        }
        
        dispatch(orderPageOperations.updateOrders(payload))
            .then(() => {
                submitForm()
                initialStateForm()
            })
            .catch((e) => {
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
    }, [isClickedClear])

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
                            { name: "First Name", type: "text", data: firstName, action: ((e) => setFirstName(e.target.value)) },
                            { name: "Last Name", type: "text", data: lastName, action: ((e) => setLastName(e.target.value)) },
                            { name: "Middle Name", type: "text", data: middleName, action: ((e) => setMiddleName(e.target.value)) },
                            { name: "Promo Name", type: "select", data: promoName, action: (handlePromoNameDropdown) },
                            { name: "Provider Name", type: "select", data: providerName, action: (handleProviderNameDropdown) },
                            { name: "Price", type: "text", data: price, action: ((e) => setPrice(e.target.value)) },
                            { name: "Status", type: "select", data: status, action: (handleStatusDropdown) }
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
                        formRows={[
                            { name: "First Name", type: "text", disabled: editDisabled, data: firstName, action: ((e) => setFirstName(e.target.value)) },
                            { name: "Last Name", type: "text", disabled: editDisabled, data: lastName, action: ((e) => setLastName(e.target.value)) },
                            { name: "Middle Name", type: "text", disabled: editDisabled, data: middleName, action: ((e) => setMiddleName(e.target.value)) },
                            { name: "Promo Name", type: "select", disabled: editDisabled, data: promoName, action: (handlePromoNameDropdown) },
                            { name: "Provider Name", type: "select", disabled: editDisabled, data: providerName, action: (handleProviderNameDropdown) },
                            { name: "Price", type: "text", disabled: editDisabled, data: price, action: ((e) => setPrice(e.target.value)) },
                            { name: "Status", type: "select", disabled: editDisabled, data: status, action: (handleStatusDropdown) }
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