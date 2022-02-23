import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { operations as landingPageOperations } from '../LandingPage/state';
import CustomerTable from '../../components/TableTemplate';
import { Container } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar'
import { RiMessage3Line, RiChat4Fill, RiTeamFill, RiTaskFill, RiPieChart2Fill, RiLogoutBoxFill } from 'react-icons/ri';
import { authOperations } from '../Login/state';
import { Row, Col, Card } from 'react-bootstrap';
import CardTemplate from '../../components/CardTemplate';

const RootPage = () => {

    const dispatch = useDispatch();
    const isInitialMount = useRef(true);

    const tableHeaderReducer = useSelector(state => state.landingPage.table.tableHeader)
    const tableColumnsReducer = useSelector(state => state.landingPage.table.tableColumns)
    const sortDataReducer = useSelector(state => state.landingPage.sortOptions)

    const [collapseSidebar, setCollapseSidebar] = useState(false)
    const [customerData, setCustomerData] = useState([])
    const [pageInput, setPageInput] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [query, setQuery] = useState("A")
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const logoutUser = authOperations.logoutUser

    const submitForm = () => {
        let payload = {
            query: query,
            sortDirection: sortDataReducer.sortDirection,
            sortItem: sortDataReducer.sortItem,
            itemsPerPage: itemsPerPage,
            pageInput: pageInput,
        };

        dispatch(landingPageOperations.listCustomers(payload))
            .then((response) => {
                setCustomerData(response.data)
                setTotalPages(response.totalPages)
            })
    }

    const handleCurrentPage = () => {

    }

    const handleEditRow = () => {

    }

    const handleDeleteRow = () => {

    }

    const handleInfoRow = () => {

    }

    const handleNavigatePage = () => {

    }

    const handleNext = () => {
        setPageInput(parseInt(pageInput) + 1)
    }

    const handlePrev = () => {
        setPageInput(parseInt(pageInput) - 1)
    }

    const handleLastPage = () => {
        setPageInput(totalPages)
    }

    const handleFirstPage = () => {
        setPageInput(1)
    }

    const handleItemPerPageSelect = (event) => {
        setItemsPerPage(parseInt(event))
        setPageInput(1)
    }

    const handleToggleSidebar = () => {
        collapseSidebar ? setCollapseSidebar(false) : setCollapseSidebar(true)
    }

    useEffect(() => {
        submitForm()
    }, [])

    useEffect(() => {
        //prevent this block from running during mount.
        //all useEffect instances always run on mount. 
        //Need a checker to prevent mounting except for the blank ones.
        isInitialMount.current ? isInitialMount.current = false : submitForm()
    }, [itemsPerPage, pageInput, sortDataReducer, query])

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
                                <CardTemplate
                                    cardTitle='Smart'
                                    cardDesc='Lorem ipsum dolor sit amet. Eum dolore enim sit enim temporibus id fugit consectetur ad repellat libero sit illo quidem.'
                                    cardButtonName='Go'
                                // onClick
                                />
                            </Col>
                            <Col xs={4}>
                                <CardTemplate
                                    cardTitle='Smart'
                                    cardDesc='Lorem ipsum dolor sit amet. Eum dolore enim sit enim temporibus id fugit consectetur ad repellat libero sit illo quidem.'
                                    cardButtonName='Go'
                                // onClick
                                />
                            </Col>
                            <Col xs={4}>
                                <CardTemplate
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
                                        { variant: "btn btn-info", label: "View", onClick: (() => handleInfoRow()) },
                                        { variant: "btn btn-success", label: "Edit", onClick: (() => handleEditRow()) },
                                        { variant: "btn btn-danger", label: "Delete", onClick: (() => handleDeleteRow()) }
                                    ]}
                                    pagination={{
                                        name: 'currentPage',
                                        id: 'currentPage',
                                        currentPage: pageInput,
                                        size: 'sm',
                                        type: "text",
                                        totalPages: totalPages,
                                        onChange: (() => handleCurrentPage()),
                                        onKeyDown: (() => handleNavigatePage()),
                                        onClickNext: (() => handleNext()),
                                        onClickPrev: (() => handlePrev()),
                                        onClickLast: (() => handleLastPage()),
                                        onClickFirst: (() => handleFirstPage()),
                                        itemsPerPage: itemsPerPage,
                                        handleItemPerPageSelect: handleItemPerPageSelect
                                    }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default RootPage;