import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { operations as landingPageOperations } from '../LandingPage/state';
import CustomerTable from '../../components/TableTemplate';

const RootPage = () => {

    const dispatch = useDispatch();
    const isInitialMount = useRef(true);

    const tableHeaderReducer = useSelector(state => state.landingPage.table.tableHeader)
    const tableColumnsReducer = useSelector(state => state.landingPage.table.tableColumns)

    const [customerData, setCustomerData] = useState([])
    const [pageInput, setPageInput] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [query, setQuery] = useState("A")
    const [sortItem, setSortItem] = useState("firstName")
    const [sortDirection, setSortDirection] = useState("Ascending")
    const [itemsPerPage, setItemsPerPage] = useState(5)

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

    const handleSortBy = (event) => {
        setSortItem(event)
        setPageInput(1)
    }

    const handleSortDirection = (event) => {
        setSortDirection(event)
        setPageInput(1)
    }

    const handleItemPerPageSelect = (event) => {
        setItemsPerPage(parseInt(event))
        setPageInput(1)
    }

    useEffect(() => {
        submitForm()
    }, [])

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            submitForm()
        }
        
    }, [itemsPerPage, pageInput, sortItem, sortDirection, query])

    return (
        <center>
            <h1>ReactJS Codebase</h1>
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
                    sortItem: sortItem,
                    sortDirection: sortDirection,
                    itemsPerPage: itemsPerPage,
                    handleSortBy: handleSortBy,
                    handleSortDirection: handleSortDirection,
                    handleItemPerPageSelect: handleItemPerPageSelect
                }}
            />
        </center>
    );
}

export default RootPage;