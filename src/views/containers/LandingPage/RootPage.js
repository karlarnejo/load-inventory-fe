import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { operations as landingPageOperations } from '../LandingPage/state';
import CustomerTable from '../../components/TableTemplate';

const RootPage = () => {

    const dispatch = useDispatch();
    const [customerData, setCustomerData] = useState([])
    const tableHeaderReducer = useSelector(state => state.landingPage.table.tableHeader)
    const tableColumnsReducer = useSelector(state => state.landingPage.table.tableColumns)

    useEffect(() => {
        dispatch(landingPageOperations.listCustomers())
            .then((response) => {
                setCustomerData(response)
            })
    }, [])

    return (
        <center>
            <h1>ReactJS Codebase</h1>
            <CustomerTable
                tableHeader={tableHeaderReducer}
                tableColumns={tableColumnsReducer}
                tableList={customerData.map((data) => {
                    return (data)
                })}
            />
        </center>
    );
}

export default RootPage;