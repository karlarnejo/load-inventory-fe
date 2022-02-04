import React from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';

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
    
    return(
        <Table condensed="true" hover bordered responsive>
            <thead>
                <tr>{TableHeader}</tr>
            </thead>
            <tbody>
                {TableList}
            </tbody>
        </Table>
    )
}

export default TableTemplate;