import React from 'react';
import { Table, Button, ButtonToolbar, Pagination, FormControl, InputGroup, Form, Dropdown, FormLabel } from 'react-bootstrap';
import EllipsisText from "react-ellipsis-text";
import lodash from 'lodash'

let TableTemplate = (props) =>{
    
    //Renders table header
    const TableHeader = props.tableHeader && props.tableHeader.map((header, i)=>{
        return <th key={i}>{header}</th>;
    });

    //Renders table row
    const TableList = props.tableList && 0 < props.tableList.length ? (
        props.tableList.map((row, i)=>{
            return (
                <tr key={i}>
                    {RenderRow(row)}
                    {props.rowButtons ? RenderButtons(row) : null}
                </tr>
            );
        })
    ) : <tr><td className="col-center" colSpan={props.tableHeader.length}>No records found</td></tr>

    //Renders row data
    function RenderRow(data){
        return(
            props.tableColumns.map((column, i)=>{    
                return(
                    <td key={i}>{data[column]}</td>
                );
            })
        );
    }

    //Renders row buttons
    function RenderButtons(data){
        return(
            <td className="col-center">
                <ButtonToolbar style={{display: "flex", justifyContent: "center"}}>
                {props.rowButtons.map((button, i)=>{    
                    return(
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

    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    function currentPage() {
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

    function pagination() {

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
                                <FormLabel className='my-1 mr-2'>{"Sort"}</FormLabel>
                                <Dropdown.Toggle disabled={props.disabledLoadEmpty} className='btn-dropdown' variant='light' size='md'>
                                    {lodash.startCase(props.pagination.sortItem)}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onSelect={props.pagination.handleSortBy} eventKey={"firstName"}>{"First Name"}</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleSortBy} eventKey={"lastName"}>{"Last Name"}</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleSortBy} eventKey={"middleName"}>{"Middle Name"}</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleSortBy} eventKey={"address"}>{"Address"}</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleSortBy} eventKey={"gender"}>{"Gender"}</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleSortBy} eventKey={"contactNo"}>{"Contact No."}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className='padding-small'>
                                <FormLabel className='my-1 mr-2'>{"Sort Order"}</FormLabel>
                                <Dropdown.Toggle disabled={props.disabledLoadEmpty} className='btn-dropdown' variant='light' size='md'>
                                    {props.pagination.sortDirection}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onSelect={props.pagination.handleSortDirection} eventKey={"Ascending"}>{"Ascending"}</Dropdown.Item>
                                    <Dropdown.Item onSelect={props.pagination.handleSortDirection} eventKey={"Descending"}>{"Descending"}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className='padding-small'>
                                <FormLabel className='my-1 mr-2'>{"Items"}</FormLabel>
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
                            </Dropdown>
                        </Form.Row>
                        <Form.Row className='ml-auto'>

                            <Pagination style={{ float: 'right', marginTop: 15 }} size='md'>
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
    
    return(
        <div>
            {pagination()}
            <Table condensed="true" hover bordered responsive>
                <thead>
                    <tr>{TableHeader}</tr>
                </thead>
                <tbody>
                    {TableList}
                </tbody>
            </Table>
        </div>
    )
}

export default TableTemplate;