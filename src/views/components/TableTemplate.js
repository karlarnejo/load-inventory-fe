import React from 'react';
import { Table, Button, ButtonToolbar, Pagination, FormControl, InputGroup, Form, Dropdown, Col, Row, Card } from 'react-bootstrap';
import lodash from 'lodash'
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';

let TableTemplate = (props) => {

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

    const headerChecker = (header) => {
        return header !== "Actions" ? true : false
    }

    const sortChecker = (header) => {

        return (
            headerChecker(header) && header === lodash.startCase(props.pagination.sortItem) ?
                (props.pagination.sortDirection === "Ascending") ?
                    <RiSortAsc />
                    : <RiSortDesc />
                : null
        )
    }

    //Renders table header
    const TableHeader = props.tableHeader && props.tableHeader.map((header, i) => {
        return (
            <th
                key={i}
                style={headerChecker(header) ? { cursor: "pointer" } : null}
                onClick={headerChecker(header) ? () => { props.handleSortClick(header) } : null}>{sortChecker(header)} {header}
            </th>
        )
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
                style={{ width: '70px' }}
            />);
        } else return null;
    }

    const pagination = () => {

        if (props.tableList) {

            let firstPrev = (!props.pagination.currentPage || props.pagination.currentPage === 1 || props.pagination.totalPages === 0) ? (
                true) : false

            let nextLast = (!props.pagination.currentPage || props.pagination.currentPage === props.pagination.totalPages || props.pagination.totalPages === 0) ? (
                true) : false

            return (
                <>
                    <Row>
                        <Col sm={6}>
                            <Dropdown className=' mt-1'>
                                <span className='mr-1 dropdown-size'>{"Showing"}</span>
                                <Dropdown.Toggle disabled={props.disabledLoadEmpty} className='dropdown-size btn-dropdown' variant='light' size='sm'>
                                    {props.pagination.itemsPerPage}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onSelect={props.pagination.handleItemPerPageSelect} eventKey='5'>5</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleItemPerPageSelect} eventKey='10'>10</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleItemPerPageSelect} eventKey='15'>15</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleItemPerPageSelect} eventKey='20'>20</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleItemPerPageSelect} eventKey='25'>25</Dropdown.Item>
                                </Dropdown.Menu>
                                <span className='ml-1 mr-2 dropdown-size'>{"entries"}</span>
                            </Dropdown>
                        </Col>
                        <Col sm={6}>
                            <Form className='form-inline float-right ml-auto' onKeyDown={onKeyDown}>
                                <Form.Row className='fg-1 mr-4 search-bar'>
                                    <Pagination style={{ marginRight: '5px', float: 'right'}} size='md'>
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
                        </Col>
                    </Row>
                </>
            )
        }
        else return null;
    }

    const addRecordSearch = () => {

        if (props.tableList) {
            return (
                <>
                    <Row>
                        <Col className='mt-3' sm={6}>
                            <Button className='btn-success' onClick={props.handleOpenAddCustomerModal}>Add Record</Button>
                        </Col>
                        <Col sm={6}>
                            <Form className='form-inline ai-start' onSubmit={props.pagination.handleSearchSubmit}>
                                <Form.Row className='ml-auto mr-4 mt-3'>
                                    <Form.Control
                                        // disabled={isResultLoading ? true : false}
                                        className="searchField"
                                        type="text"
                                        placeholder={"Search"}
                                        value={props.pagination.query}
                                        size='md'
                                        id='search'
                                        list='searchbar'
                                        onChange={props.pagination.handleAutoComplete}
                                        autoComplete="off"
                                    />
                                </Form.Row>
                                <Form.Row className="mr-0 button-group mt-3" style={{ width: '100% !important' }}>
                                    <div className="search-button mr-2">
                                        <Button type="submit" className="btn-success ml-auto" disabled={props.pagination.isResultLoading ? true : false}>{"Search"}</Button>
                                    </div>
                                    <div className="clear-button">
                                        <button type="button" onClick={props.pagination.handleClearForm} className="btn btn-danger" disabled={props.pagination.isResultLoading ? true : false}>{"Clear"}</button>
                                    </div>
                                </Form.Row>

                            </Form>
                        </Col>
                    </Row>

                </>
            );
        } else return null;
    }

    return (
        <div>
            <Card>
                {addRecordSearch()}
                <hr />
                <Table condensed="true" hover bordered responsive>
                    <thead>
                        <tr>{TableHeader}</tr>
                    </thead>
                    <tbody>
                        {TableList}
                    </tbody>
                </Table>
                {pagination()}
            </Card>
        </div>
    )
}

export default TableTemplate;