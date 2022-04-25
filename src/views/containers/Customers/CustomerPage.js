import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { operations as customerPageOperations } from './state';
import CustomerTable from '../../components/TableTemplate';
import { Row, Col, Card, Container } from 'react-bootstrap';
import lodash from 'lodash'
import { ModalTemplate as AddCustomerModal } from '../../components/ModalTemplate'
import { ModalTemplate as ViewCustomerModal } from '../../components/ModalTemplate'
import { ModalTemplate as DeleteCustomerModal } from '../../components/ModalTemplate'
import { FormControlTemplate as CustomerAddForm } from '../../components/FormControlTemplate'
import { FormControlTemplate as CustomerEditForm } from '../../components/FormControlTemplate'

const CustomerPage = () => {

    const dispatch = useDispatch();
    const isInitialMount = useRef(true);

    const tableHeaderReducer = useSelector(state => state.customerPage.table.tableHeader)
    const tableColumnsReducer = useSelector(state => state.customerPage.table.tableColumns)
    const collapseSidebar = useSelector(state => state.landingePage.collapseSidebar)

    const [customerData, setCustomerData] = useState([])
    const [pageInput, setPageInput] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [query, setQuery] = useState("")
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [isResultLoading, setIsResultLoading] = useState(false)
    const [sortItem, setSortItem] = useState("firstName")
    const [sortDirection, setSortDirection] = useState("Ascending")
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false)
    const [showViewCustomerModal, setShowViewCustomerModal] = useState(false)
    const [showDeleteCustomerModal, setShowDeleteCustomerModal] = useState(false)
    const [forInlineDeletion, setForInlineDeletion] = useState("")
    const [editDisabled, setEditDisabled] = useState(true)
    const [isClickedClear, setIsClickedClear] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [address, setAddress] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [gender, setGender] = useState("")
    const [customerNumber, setCustomerNumber] = useState("")

    const initialStateForm = () => {
        setFirstName("")
        setLastName("")
        setMiddleName("")
        setAddress("")
        setContactNo("")
        setGender("")
        setCustomerNumber("")
    }

    // modal
    const handleEditDisabled = () => setEditDisabled(!editDisabled)
    const handleOpenAddCustomerModal = () => setShowAddCustomerModal(true)
    const handleCloseAddCustomerModal = () => {
        setShowAddCustomerModal(false)

        initialStateForm()
    }
    const handleOpenViewCustomerModal = (e) => {
        setShowViewCustomerModal(true)

        setFirstName(e.firstName)
        setLastName(e.lastName)
        setMiddleName(e.middleName)
        setAddress(e.address)
        setContactNo(e.contactNo)
        setGender(e.gender)
        setCustomerNumber(e.customerId)
    }
    const handleCloseViewCustomerModal = () => {
        setShowViewCustomerModal(false)

        initialStateForm()
        setEditDisabled(true)
    }
    const handleCloseDeleteCustomerModal = () => setShowDeleteCustomerModal(false)

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

        dispatch(customerPageOperations.listCustomers(payload))
            .then((response) => {
                setCustomerData(response.data)
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

    const handleDeleteCustomer = () => {
        let payload = {
            customerId: forInlineDeletion
        }

        dispatch(customerPageOperations.deleteCustomer(payload))
            .then(() => {
                submitForm()
            })
        handleCloseDeleteCustomerModal()
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        submitForm()
    }

    const handleNavigatePage = () => {

    }

    const handleGenderDropdown = (e) => {
        setGender(e)
    }

    const handleSaveCustomer = () => {

        let payload = {
            customerId: customerNumber,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            gender: gender,
            contactNo: contactNo,
            address: address
        }

        dispatch(customerPageOperations.saveCustomer(payload))
            .then(() => {
                submitForm()
                initialStateForm()
            })
            .catch((e) => {
                console.log("Error: ", e)
            })
        setShowAddCustomerModal(false)
    }

    const handleEditCustomer = () => {

        let payload = {
            customerId: customerNumber,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            gender: gender,
            contactNo: contactNo,
            address: address
        }

        dispatch(customerPageOperations.updateCustomer(payload))
            .then(() => {
                submitForm()
                initialStateForm()
            })
            .catch((e) => {
                console.log("Error: ", e)
            })
        setShowViewCustomerModal(false)
        setEditDisabled(true)
    }

    const handleClearForm = () => {
        setIsClickedClear(true)
        setQuery("")
    }

    const handleOpenDeleteCustomerModal = (e) => {
        setShowDeleteCustomerModal(true)
        setForInlineDeletion(e.customerId)
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
                                <CustomerTable
                                    tableHeader={tableHeaderReducer}
                                    tableColumns={tableColumnsReducer}
                                    tableList={customerData.map((data) => {
                                        return (data)
                                    })}
                                    rowButtons={[
                                        { variant: "btn btn-info", label: "View", onClick: ((e) => handleOpenViewCustomerModal(e)) },
                                        { variant: "btn btn-danger", label: "Delete", onClick: ((e) => handleOpenDeleteCustomerModal(e)) }
                                    ]}
                                    handleSortClick={(e) => handleSortClick(e)}
                                    handleOpenAddModal={() => handleOpenAddCustomerModal()}
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

            <AddCustomerModal
                handleCloseModal={() => handleCloseAddCustomerModal()}
                showModal={showAddCustomerModal}
                handleSuccess={() => handleSaveCustomer()}
                title={"Add Customer"}
                body={
                    <CustomerAddForm
                        formRows={[
                            { name: "First Name", type: "text", data: firstName, action: ((e) => setFirstName(e.target.value)) },
                            { name: "Last Name", type: "text", data: lastName, action: ((e) => setLastName(e.target.value)) },
                            { name: "Middle Name", type: "text", data: middleName, action: ((e) => setMiddleName(e.target.value)) },
                            { name: "Address", type: "text", data: address, action: ((e) => setAddress(e.target.value)) },
                            { name: "Contact No", type: "text", data: contactNo, action: ((e) => setContactNo(e.target.value)) },
                            { name: "Gender", type: "select", data: gender, action: (handleGenderDropdown) }
                        ]}
                    />
                }
            />
            < ViewCustomerModal
                handleCloseModal={() => handleCloseViewCustomerModal()}
                showModal={showViewCustomerModal}
                title={"View Customer"}
                handleDisabled={() => handleEditDisabled()}
                disabled={editDisabled}
                handleSuccess={() => handleEditCustomer()}
                type={"view"}
                body={
                    <CustomerEditForm
                        formRows={[
                            { name: "First Name", type: "text", disabled: editDisabled, data: firstName, action: ((e) => setFirstName(e.target.value)) },
                            { name: "Last Name", type: "text", disabled: editDisabled, data: lastName, action: ((e) => setLastName(e.target.value)) },
                            { name: "Middle Name", type: "text", disabled: editDisabled, data: middleName, action: ((e) => setMiddleName(e.target.value)) },
                            { name: "Address", type: "text", disabled: editDisabled, data: address, action: ((e) => setAddress(e.target.value)) },
                            { name: "Contact No", type: "text", disabled: editDisabled, data: contactNo, action: ((e) => setContactNo(e.target.value)) },
                            { name: "Gender", type: "select", disabled: editDisabled, data: gender, action: (handleGenderDropdown) }
                        ]}
                    />
                }
            />
            <DeleteCustomerModal
                handleCloseModal={() => handleCloseDeleteCustomerModal()}
                handleSuccess={() => handleDeleteCustomer()}
                showModal={showDeleteCustomerModal}
                title={"Delete Customer"}
                type={"notification"}
                body={"Are you sure you want to delete this record?"}
            />
        </>
    );
}

export default CustomerPage;