import React from 'react';
import {Form, Container, Dropdown } from 'react-bootstrap';
import Select from 'react-select';

export const FormControlTemplate = (props) => {
    return (
            <Form>
                {props.formRows.map((formRow, index) => {
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
                                    <Select key={index}
                                        defaultValue={formRow.data}
                                        onInputChange={formRow.onInputChange ? e => formRow.onInputChange(e): null}
                                        onChange={formRow.onChange}
                                        onSelectResetsInput={false}
                                        options={formRow.dropdownChoices}
                                        isDisabled={formRow.disabled}
                                    />
                                </Form.Group>
                            )
                        }
                        default: {
                            return (
                                <Form.Group className='m-2'>
                                    <Form.Label>{formRow.name}</Form.Label>
                                    <Form.Control
                                        key={index}
                                        type="text"
                                        value={formRow.data}
                                        size='sm'
                                        disabled={formRow.disabled}
                                        placeholder={formRow.name}
                                        onChange={formRow.onChange}
                                    />
                                </Form.Group>
                            )
                        }
                    }
                })}
            </Form>
    )
}