import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, ButtonToolbar, Pagination, FormControl, InputGroup, Form, Dropdown, FormLabel } from 'react-bootstrap';
// import EllipsisText from "react-ellipsis-text";
import lodash from 'lodash'
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { sortOptions } from '../containers/LandingPage/state/actions';

let TableTemplate = (props) => {

    const dispatch = useDispatch();

    const sortDataReducer = useSelector(state => state.landingPage.sortOptions)

    //Renders row data
    const RenderRow = (data) => {
        return (
            props.tableColumns.map((column, i) => {
                return (
                    <td key={i}>{data[column]}</td>
                );
            })
        );
    }

    //Renders row buttons
    const RenderButtons = (data) => {
        return (
            <td className="col-center">
                <ButtonToolbar style={{ display: "flex", justifyContent: "center" }}>
                    {props.rowButtons.map((button, i) => {
                        return (
                            <Button
                                key={i}
                                variant={button.variant}
                                onClick={button.onClick.bind(this, data)}
                            >
                                {button.label}
                            </Button>
                        )
                    })}
                </ButtonToolbar>
            </td>
        );
    }

    const handleSortClick = (header) => {
        const refinedeHeader = lodash.camelCase(header)
        let tempSortDirection = ""

        sortDataReducer.sortDirection === "Ascending" ? tempSortDirection = "Descending" : tempSortDirection = "Ascending";

        const sortData = {
            sortItem: refinedeHeader,
            sortDirection: tempSortDirection
        }

        dispatch(sortOptions(sortData))
    }

    const headerChecker = (header) => {

        return (
            (header === lodash.startCase(sortDataReducer.sortItem) ? (sortDataReducer.sortDirection === "Ascending") ? <RiSortAsc/> : <RiSortDesc/> : null)
        )
    }

    //Renders table header
    const TableHeader = props.tableHeader && props.tableHeader.map((header, i) => {
        return <th key={i} style={{ cursor: "pointer" }} onClick={() => {handleSortClick(header)}}>{headerChecker(header)} {header}</th>;
    });

    //Renders table row
    const TableList = props.tableList && 0 < props.tableList.length ? (
        props.tableList.map((row, i) => {
            return (
                <tr key={i}>
                    {RenderRow(row)}
                    {props.rowButtons ? RenderButtons(row) : null}
                </tr>
            );
        })
    ) : <tr><td className="col-center" colSpan={props.tableHeader.length}>No records found</td></tr>

    const onKeyDown = (keyEvent) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    const currentPage = () => {
        if (props.tableList) {
            return (<FormControl
                disabled={props.disabledLoadEmpty}
                size='md'
                name={props.pagination.name}
                id={props.pagination.id}
                className='ml-1 pagination-size'
                type={props.pagination.type}
                placeholder={props.pagination.currentPage}
                value={props.pagination.currentPage}
                onChange={props.pagination.onChange}
                onKeyDown={props.pagination.onKeyDown}
                style={{ width: '100px' }}
            />);
        } else return null;
    }

    const pagination = () => {

        let firstPrev = (props.pagination.currentPage === 1 || props.pagination.totalPages === 0) ? (
            true) : false

        let nextLast = (props.pagination.currentPage === props.pagination.totalPages || props.pagination.totalPages === 0) ? (
            true) : false

        if (props.tableList) {
            return (
                <>
                    <Form className='form-inline' onKeyDown={onKeyDown}>
                        <Form.Row >
                            <Dropdown className='padding-small'>
                                <span className='my-1 mr-2'>{"Showing"}</span>
                                <Dropdown.Toggle disabled={props.disabledLoadEmpty} className='btn-dropdown' variant='light' size='md'>
                                    {props.pagination.itemsPerPage}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onSelect={props.pagination.handleItemPerPageSelect} eventKey='5'>5</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleItemPerPageSelect} eventKey='10'>10</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleItemPerPageSelect} eventKey='15'>15</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleItemPerPageSelect} eventKey='20'>20</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleItemPerPageSelect} eventKey='25'>25</Dropdown.Item>
                                </Dropdown.Menu>
                                <span className='my-1 mr-2'>{"records per page"}</span>
                            </Dropdown>
                        </Form.Row>
                        <Form.Row className='ml-auto'>
                            <Pagination style={{ marginRight: '5px', float: 'right', marginTop: 15 }} size='md'>
                                <InputGroup size="md">
                                    <InputGroup.Prepend>
                                        <Pagination.First disabled={firstPrev || props.disabledLoad} onClick={() => { props.pagination.onClickFirst() }} />
                                        <Pagination.Prev disabled={firstPrev || props.disabledLoad} onClick={() => { props.pagination.onClickPrev() }} />
                                    </InputGroup.Prepend>
                                    <InputGroup.Prepend>
                                        {currentPage()}
                                        <InputGroup.Text className='pagination-size'>/ {props.pagination.totalPages}</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <InputGroup.Append>
                                        <Pagination.Next className='ml-1' disabled={nextLast || props.disabledLoad} onClick={() => { props.pagination.onClickNext() }} />
                                        <Pagination.Last disabled={nextLast || props.disabledLoad} onClick={() => { props.pagination.onClickLast() }} />
                                    </InputGroup.Append>
                                </InputGroup>
                            </Pagination>
                        </Form.Row>
                    </Form>
                </>
            );
        } else return null;
    }

    return (
        <div>
            {pagination()}
            <hr />
            <Table condensed="true" hover bordered responsive>
                <thead>
                    <tr>{TableHeader}</tr>
                </thead>
                <tbody>
                    {TableList}
                </tbody>
            </Table>
            <hr />
            {pagination()}
        </div>
    )
}

export default TableTemplate;