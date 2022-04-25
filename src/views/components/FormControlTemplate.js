import React from 'react';
import {Form, Container, Dropdown } from 'react-bootstrap';

export const FormControlTemplate = (props) => {
    return (
            <Form>
                {props.formRows.map((formRow) => {

                    switch (formRow.type) {
                        case "file": {
                            // TODO

                            return null
                        }
                        case "radio": {
                            //TODO

                            return null
                        }
                        case "checkbox": {
                            //TODO

                            return null
                        }
                        case "select": {
                            return (
                                <Form.Group className='m-2'>
                                    <Form.Label>{formRow.name}</Form.Label>
                                    <Dropdown className=' mt-1'>
                                        <Dropdown.Toggle disabled={formRow.disabled} className='dropdown-size btn-dropdown' variant='light' placeholder='M' size='sm'>
                                            {formRow.data}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onSelect={formRow.action} eventKey='M'>M</Dropdown.Item>
                                            <Dropdown.Item onSelect={formRow.action} eventKey='F'>F</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            )
                        }
                        default: {
                            return (
                                <Form.Group className='m-2'>
                                    <Form.Label>{formRow.name}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formRow.data}
                                        size='sm'
                                        disabled={formRow.disabled}
                                        placeholder={formRow.name}
                                        onChange={formRow.action}
                                    />
                                </Form.Group>
                            )
                        }
                    }
                })}
            </Form>
    )
}