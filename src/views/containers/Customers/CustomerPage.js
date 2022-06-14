import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { operations as customerPageOperations } from './state';
import CustomerTable from '../../components/TableTemplate';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { ModalTemplate as AddCustomerModal } from '../../components/ModalTemplate'
import { ModalTemplate as ViewCustomerModal } from '../../components/ModalTemplate'
import { ModalTemplate as DeleteCustomerModal } from '../../components/ModalTemplate'
import { FormControlTemplate as CustomerAddForm } from '../../components/FormControlTemplate'
import { FormControlTemplate as CustomerEditForm } from '../../components/FormControlTemplate'
import { DESCENDING, ASCENDING, SORT_DIRECTION, SORT_ITEM, SEARCH_QUERY, PAGE_INPUT, ITEMS_PER_PAGE, CUSTOMER_HEADER_DATA, DEFAULT_CUSTOMER_SORT_ITEM } from "../../../utils/constants";
import { updateUrlParameter, uriPusher } from "../../../utils/uriChecker";

const CustomerPage = () => {

    let currentLocation = window.location.href
    const dispatch = useDispatch();
    const isInitialMount = useRef(true);

    const tableHeaderReducer = useSelector(state => state.customerPage.table.tableHeader)
    const tableColumnsReducer = useSelector(state => state.customerPage.table.tableColumns)

    const [customerData, setCustomerData] = useState([])
    const [pageInput, setPageInput] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [query, setQuery] = useState("")
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [isResultLoading, setIsResultLoading] = useState(false)
    const [sortItem, setSortItem] = useState(DEFAULT_CUSTOMER_SORT_ITEM)
    const [sortItemHeader, setSortItemHeader] = useState("First Name")
    const [sortDirection, setSortDirection] = useState(ASCENDING)
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
    const handleNext = () => {
        setPageInput(parseInt(pageInput) + 1)

        let pageInputUrl = updateUrlParameter(currentLocation, PAGE_INPUT, parseInt(pageInput) + 1)
        uriPusher(pageInputUrl, ITEMS_PER_PAGE, itemsPerPage, false)
    }
    const handlePrev = () => {
        setPageInput(parseInt(pageInput) - 1)

        let pageInputUrl = updateUrlParameter(currentLocation, PAGE_INPUT, parseInt(pageInput) - 1)
        uriPusher(pageInputUrl, ITEMS_PER_PAGE, itemsPerPage, false)
    }
    const handleLastPage = () => {
        setPageInput(totalPages)

        let pageInputUrl = updateUrlParameter(currentLocation, PAGE_INPUT, totalPages)
        uriPusher(pageInputUrl, ITEMS_PER_PAGE, itemsPerPage, false)
    }
    const handleFirstPage = () => {
        setPageInput(1)

        let pageInputUrl = updateUrlParameter(currentLocation, PAGE_INPUT, 1)
        uriPusher(pageInputUrl, ITEMS_PER_PAGE, itemsPerPage, false)
    }

    // table search
    const handleAutoComplete = (e) => {
        setQuery(e.target.value)

        let searchQueryUrl = updateUrlParameter(currentLocation, SEARCH_QUERY, e.target.value)
        uriPusher(searchQueryUrl, ITEMS_PER_PAGE, itemsPerPage, false)
    }

    const submitForm = () => {

        let search = window.location.search;
        let params = new URLSearchParams(search);

        if (currentLocation !== "http://localhost:3000/customer") {
            setSortDirection(params.get('sortDirection'))
            setQuery(params.get('searchQuery'))
            setSortItem(params.get('sortItem'))
            setItemsPerPage(params.get('itemsPerPage'))
            setPageInput(params.get('pageInput'))
        }

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

                    uriPusher(currentLocation, PAGE_INPUT, parseInt(e.target.value), false)
                }
            }
        }
    }

    const handleSortClick = (header) => {

        let sortVal = ASCENDING;
        let sortUrl = ""

        CUSTOMER_HEADER_DATA.map((data) => {
            if (data.header === header) {
                setSortItem(data.data)
                setSortItemHeader(data.header)

                sortUrl = updateUrlParameter(currentLocation, SORT_ITEM, data.data)
            }
        })

        if (sortDirection === sortVal) { sortVal = DESCENDING }

        setSortDirection(sortVal)

        let sortDirUrl = updateUrlParameter(sortUrl, SORT_DIRECTION, sortVal)
        uriPusher(sortDirUrl, ITEMS_PER_PAGE, itemsPerPage, false)

    }

    const handleItemPerPageSelect = (event) => {

        setItemsPerPage(parseInt(event))
        setPageInput(1)

        let pageInputUrl = updateUrlParameter(currentLocation, ITEMS_PER_PAGE, parseInt(event))
        uriPusher(pageInputUrl, PAGE_INPUT, parseInt(1), false)
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
        setGender(e.value)
    }


    // Save customer
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

    // Edit customer
    const handleEditCustomer = () => {

        let payload = {
            customerId: customerNumber,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            gender: gender,
            contactNo: contactNo,
            address: address,
            updatedAt: new Date()
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
        setSortDirection(ASCENDING)
        setSortItem(DEFAULT_CUSTOMER_SORT_ITEM)
        setItemsPerPage(5)
        setPageInput(1)

        uriPusher("http://localhost:3000/customer", undefined, undefined, true)
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
            submitForm()
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
            <Container fluid>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CustomerTable
                                tableHeader={tableHeaderReducer}
                                tableColumns={tableColumnsReducer}
                                headerConstant={CUSTOMER_HEADER_DATA}
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
                                    sortItemHeader: sortItemHeader,
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

            <AddCustomerModal
                handleCloseModal={() => handleCloseAddCustomerModal()}
                showModal={showAddCustomerModal}
                handleSuccess={() => handleSaveCustomer()}
                title={"Add Customer"}
                body={
                    <CustomerAddForm
                        formRows={[
                            { name: "First Name", type: "text", data: firstName, onChange: ((e) => setFirstName(e.target.value)) },
                            { name: "Last Name", type: "text", data: lastName, onChange: ((e) => setLastName(e.target.value)) },
                            { name: "Middle Name", type: "text", data: middleName, onChange: ((e) => setMiddleName(e.target.value)) },
                            { name: "Address", type: "text", data: address, onChange: ((e) => setAddress(e.target.value)) },
                            { name: "Contact No", type: "text", data: contactNo, onChange: ((e) => setContactNo(e.target.value)) },
                            {
                                name: "Gender", type: "select", data: { value: gender, label: gender },
                                dropdownChoices: [
                                    { value: "M", label: "M" },
                                    { value: "F", label: "F" }
                                ],
                                onInputChange: (handleGenderDropdown)
                            }
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
                            { name: "First Name", type: "text", disabled: editDisabled, data: firstName, onChange: ((e) => setFirstName(e.target.value)) },
                            { name: "Last Name", type: "text", disabled: editDisabled, data: lastName, onChange: ((e) => setLastName(e.target.value)) },
                            { name: "Middle Name", type: "text", disabled: editDisabled, data: middleName, onChange: ((e) => setMiddleName(e.target.value)) },
                            { name: "Address", type: "text", disabled: editDisabled, data: address, onChange: ((e) => setAddress(e.target.value)) },
                            { name: "Contact No", type: "text", disabled: editDisabled, data: contactNo, onChange: ((e) => setContactNo(e.target.value)) },
                            {
                                name: "Gender", type: "select", disabled: editDisabled, data: { value: gender, label: gender },
                                dropdownChoices: [
                                    { value: "M", label: "M" },
                                    { value: "F", label: "F" }
                                ],
                                onInputChange: (handleGenderDropdown)
                            }
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