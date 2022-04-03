import React from 'react';
import { Row, Col, Card, Form, FormGroup, Button } from 'react-bootstrap';

export const FormControlTemplate = (props) => {

    // const itemsPerLine = 2
    // const itemsPerLineDivide2 = props.formNames / itemsPerLine //3

    // const checkCount = () => {
    //     let min = itemsPerLine - itemsPerLine
    //     let max = itemsPerLine


    //     for (let count = 0; count < itemsPerLineDivide2; count++) {
    //         return (
    //             <Row>
    //                 {
    //                     props.formNames / 2 % 1 === 0 ?
    //                         formNames.map((data, index) => {
    //                             if (index > min && index < max) {
    //                                 <Col sm={6}>
    //                                     <Form.Row>
    //                                         <FormGroup>
    //                                             <Form.Label>{data}</Form.Label>
    //                                             <Form.Control
    //                                                 type="text"
    //                                                 value={""}
    //                                                 size='sm'
    //                                                 placeholder={data}
    //                                             />
    //                                         </FormGroup>
    //                                     </Form.Row>
    //                                 </Col>
    //                             }

    //                             min = min + itemsPerLine
    //                             max = max + itemsPerLine
    //                         })
    //                         : null // if decimal
    //                 }
    //             </Row>
    //         )
    //     }




    //     props.formNames / 2 % 1 === 0 ?
    //         formNames.map((data, index) => {
    //             if (index > min && index < max) {
    //                 <Row>

    //                 </Row>
    //             }

    //             min = min + itemsPerLine
    //             max = max + itemsPerLine
    //         })
    //         : null // if decimal
    // }

    //for loop 3 times
    //create row
    //loop to create col

    return (
        <Form>
            {/* {props.formNames % 1 != 0 ? true} */}
            <Row>
                <Col sm={6}>
                    <Form.Row>
                        <FormGroup>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={""}
                                size='sm'
                                placeholder='FirstName'
                            />
                        </FormGroup>
                    </Form.Row>
                </Col>
                <Col sm={6}>
                    <Form.Row>
                        <FormGroup>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={""}
                                size='sm'
                                placeholder='LastName'
                            />
                        </FormGroup>
                    </Form.Row>
                </Col>
            </Row>
        </Form>
    )
}
