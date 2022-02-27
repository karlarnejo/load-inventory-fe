import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { operations as landingPageOperations } from '../LandingPage/state';
import CustomerTable from '../../components/TableTemplate';
import { Container } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar'
import { RiMessage3Line, RiChat4Fill, RiTeamFill, RiTaskFill, RiPieChart2Fill, RiLogoutBoxFill } from 'react-icons/ri';
import { authOperations } from '../Login/state';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import CardTemplate from '../../components/CardTemplate';
import lodash from 'lodash'
import { ModalTemplate as AddCustomerModal } from '../../components/ModalTemplate'
import { ModalTemplate as ViewCustomerModal } from '../../components/ModalTemplate'

const RootPage = () => {

    const dispatch = useDispatch();
    const isInitialMount = useRef(true);

    const tableHeaderReducer = useSelector(state => state.landingPage.table.tableHeader)
    const tableColumnsReducer = useSelector(state => state.landingPage.table.tableColumns)

    const [collapseSidebar, setCollapseSidebar] = useState(false)
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

    const logoutUser = authOperations.logoutUser

    const submitForm = () => {
        let payload = {
            query: query,
            sortDirection: sortDirection,
            sortItem: sortItem,
            itemsPerPage: itemsPerPage,
            pageInput: pageInput,
        };

        dispatch(landingPageOperations.listCustomers(payload))
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

    const handleSearchSubmit = () => {

    }    

    const handleEditRow = () => {

    }

    const handleDeleteRow = () => {

    }

    const handleInfoRow = () => {

    }

    const handleNavigatePage = () => {

    }

    // sidebar
    const handleToggleSidebar = () => collapseSidebar ? setCollapseSidebar(false) : setCollapseSidebar(true)

    // pagination
    const handleNext = () => setPageInput(parseInt(pageInput) + 1)
    const handlePrev = () => setPageInput(parseInt(pageInput) - 1)
    const handleLastPage = () => setPageInput(totalPages)
    const handleFirstPage = () => setPageInput(1)

    // table search
    const handleAutoComplete = (e) => setQuery(e.target.value)
    const handleClearForm = () => setQuery("")

    // modal
    const handleOpenAddCustomerModal = () => setShowAddCustomerModal(true)
    const handleCloseAddCustomerModal = () => setShowAddCustomerModal(false)
    const handleOpenViewCustomerModal = () => setShowViewCustomerModal(true)
    const handleCloseViewCustomerModal = () => setShowViewCustomerModal(false)

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
    }, [itemsPerPage, pageInput, sortItem, sortDirection, query]) //eslint-disable-line

    return (
        <>
            <Sidebar
                collapseSidebar={collapseSidebar}
                handleToggleSidebar={() => handleToggleSidebar()}
                sidebarLogo={"LOGO"}
                sidebarItems={[
                    { icon: <RiMessage3Line className="sidebar-icon" />, name: "Dashboard" },
                    { icon: <RiChat4Fill className="sidebar-icon" />, name: "Chat" },
                    { icon: <RiTeamFill className="sidebar-icon" />, name: "Teams" },
                    { icon: <RiTaskFill className="sidebar-icon" />, name: "Tasks" },
                    { icon: <RiPieChart2Fill className="sidebar-icon" />, name: "Analytics" },
                    { icon: <RiLogoutBoxFill className="sidebar-icon" />, name: "Logout", onclick: (() => dispatch(logoutUser())) }
                ]}
            />

            <div style={{ backgroundColor: "#f0f2f5" }} className={"mainContent " + (collapseSidebar ? "open-sidebar" : "close-sidebar")}>
                <Container fluid>
                    <Card>

                        <Row>
                            <Col xs={4}>
                                <CardTemplate className={"mainContent " + (collapseSidebar ? "open-sidebar" : "close-sidebar")}
                                    cardTitle='Smart'
                                    cardDesc='Lorem ipsum dolor sit amet. Eum dolore enim sit enim temporibus id fugit consectetur ad repellat libero sit illo quidem.'
                                    cardButtonName='Go'
                                // onClick
                                />
                            </Col>
                            <Col xs={4}>
                                <CardTemplate className={"mainContent " + (collapseSidebar ? "open-sidebar" : "close-sidebar")}
                                    cardTitle='Smart'
                                    cardDesc='Lorem ipsum dolor sit amet. Eum dolore enim sit enim temporibus id fugit consectetur ad repellat libero sit illo quidem.'
                                    cardButtonName='Go'
                                // onClick
                                />
                            </Col>
                            <Col xs={4}>
                                <CardTemplate className={"mainContent " + (collapseSidebar ? "open-sidebar" : "close-sidebar")}
                                    cardTitle='Smart'
                                    cardDesc='Lorem ipsum dolor sit amet. Eum dolore enim sit enim temporibus id fugit consectetur ad repellat libero sit illo quidem.'
                                    cardButtonName='Go'
                                // onClick
                                />
                            </Col>
                        </Row>
                    </Card>

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
                                        { variant: "btn btn-info", label: "View", onClick: (() => handleOpenViewCustomerModal()) },
                                        { variant: "btn btn-primary", label: "Edit", onClick: (() => handleEditRow()) },
                                        { variant: "btn btn-danger", label: "Delete", onClick: (() => handleDeleteRow()) }
                                    ]}
                                    handleSortClick={(e) => handleSortClick(e)}
                                    handleOpenAddCustomerModal={() => handleOpenAddCustomerModal()}
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
                                        handleSearchSubmit: (() => handleSearchSubmit()),
                                        handleAutoComplete: ((e) => handleAutoComplete(e)),
                                        handleClearForm: (() => handleClearForm()),
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
                title={"Add Customer"}
            />
            <ViewCustomerModal
                handleCloseModal={() => handleCloseViewCustomerModal()}
                showModal={showViewCustomerModal}
                title={"View Customer"}
            />
        </>
    );
}

export default RootPage;