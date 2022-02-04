import React from 'react';
import { FormLabel, FormGroup, Button, ButtonToolbar, FormCheck, Tabs, Tab, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Formik, Form, Field, FieldArray } from 'formik';
import { isNullOrUndefined } from '../../../node_modules/util';
import { DATE_FORMAT } from '../../utils/constants';

let FormTemplate = (props) => {

    //Initial values
    let initialValues = props.initialValues;

    if (isNullOrUndefined(props.initialValues)) {
        initialValues = {};
        //Initial value if tabbed or single
        if (isNullOrUndefined(props.initialValues)) {
            if (props.tabbed || props.nested) {
                props.multiFormInputs.map(tab => {
                    let modelValues = {};
                    tab.form.map(input => (
                        input.type === "datepicker" ? modelValues[input.name] = moment()
                            : modelValues[input.name] = input.default
                    ));
                    initialValues[tab.model] = modelValues;
                    return initialValues[tab.model];
                });
            } else {
                let modelValues = {};
                props.formInputs.form.map(input => (
                    input.type === "datepicker" ? modelValues[input.name] = moment()
                        : modelValues[input.name] = input.default)
                );
                initialValues[props.formInputs.model] = modelValues;
            }
        }
    }

    let defaultClass = "form-input";

    function RenderInput(model, input, fieldValue, setFieldValue, errors, touched) {
        let modelField = `${model}.${input.name}`;
        let modelTouch = touched[model];
        let isTouched = undefined !== touched[model] && modelTouch[input.name];
        let isError = undefined !== errors[modelField];
        let displayError = isTouched && isError;

        switch (input.type) {
            //renders file upload
            case "file": {
                return (
                    <FormGroup key={input.name} className={defaultClass}>
                        <FormLabel >{input.label}</FormLabel>
                        <br />
                        <input name={modelField} type="file" onChange={(event) => {
                            setFieldValue(modelField, event.target.files[0]);
                        }} />
                    </FormGroup>
                );
            }

            //renders radio button group field
            case "radio": {
                return (
                    <FormGroup key={input.name} className={defaultClass}>
                        <FormLabel >{input.label}</FormLabel >
                        {input.inline && <br />}
                        {CustomError(errors[modelField], displayError)}

                        {props.radioInput.map((radio, index) => {
                            if (radio.name === input.name) {
                                return (
                                    <FormCheck
                                        id={input.name + index}
                                        type="radio"
                                        inline={input.inline}
                                        key={index}
                                        value={radio.value}
                                        name={modelField}
                                        onChange={event => setFieldValue(modelField, event.target.value)}
                                        checked={fieldValue.toString() === radio.value.toString()}
                                        label={radio.label}
                                    />
                                );
                            }

                            return null;
                        })}
                    </FormGroup>
                )
            }


            //renders single checkbox field
            case "checkbox": {
                return (
                    <FormGroup key={input.name} className={defaultClass}>
                        <FormLabel >{input.label}</FormLabel >
                        {CustomError(errors[modelField], displayError)}

                        <FormCheck
                            id={input.name + input.value}
                            type="checkbox"
                            value={input.value}
                            name={modelField}
                            onChange={() => setFieldValue(modelField, !fieldValue)}
                            checked={fieldValue}
                            label={input.label}
                        />
                    </FormGroup>
                )
            }

            //renders multiple checkbox field
            case "multi-checkbox": {
                return (
                    <FormGroup key={input.name} className={defaultClass}>
                        <FormLabel >{input.label}</FormLabel >
                        {CustomError(errors[modelField], displayError)}

                        <FieldArray
                            name={modelField}
                            render={arrayHelpers => (
                                <div>
                                    {props.checkboxInput.map((checkbox, index) => {
                                        if (input.name === checkbox.name) {
                                            return (
                                                <FormCheck
                                                    id={input.name + index}
                                                    type="checkbox"
                                                    key={index}
                                                    name={modelField}
                                                    value={checkbox.value}
                                                    inline={input.inline}
                                                    checked={0 <= fieldValue.indexOf(checkbox.value)}
                                                    onChange={event => {
                                                        if (event.target.checked) {
                                                            arrayHelpers.push(checkbox.value)
                                                        } else {
                                                            let checkIndex = fieldValue.indexOf(checkbox.value);
                                                            arrayHelpers.remove(checkIndex);
                                                        }
                                                    }}
                                                    label={checkbox.label}
                                                />
                                            )
                                        }

                                        return null;
                                    })}
                                </div>
                            )}
                        />
                    </FormGroup>
                )
            }

            //renders datepicker field
            case "datepicker": {
                let dateValue = moment(fieldValue, input.format).isValid() ? moment(fieldValue, input.format) : null;

                return (
                    <FormGroup key={input.name} className={defaultClass}>
                        <FormLabel >{input.label}</FormLabel >
                        {CustomError(errors[modelField], displayError)}

                        <DatePicker
                            className={displayError ? "form-error" : ""}
                            name={modelField}
                            selected={dateValue}
                            onChangeRaw={(event) => event.preventDefault()}
                            onChange={newValue => setFieldValue(modelField, moment(newValue).format(DATE_FORMAT))}
                            placeholderText={input.placeholder}
                        />
                    </FormGroup>
                );
            }

            // renders select field
            case "select": {
                return (
                    <FormGroup key={input.name} className={defaultClass}>
                        <FormLabel >{input.label}</FormLabel >
                        {CustomError(errors[modelField], displayError)}

                        <Field
                            className={displayError ? "form-control form-error" : "form-control"}
                            component="select"
                            name={modelField}
                        >
                            <option disabled value="">{input.placeholder}</option>
                            {props.selectInput && props.selectInput.filter((option) => option.name === input.name).map((item, i) => {
                                return (
                                    <option key={i} value={item.value}> {item.label} </option>
                                );
                            })}
                        </Field>
                    </FormGroup>
                );
            }

            //renders text, textarea, email, password, numbers, default input
            default: {
                return (
                    <FormGroup key={modelField} className={defaultClass}>
                        <FormLabel >{input.label}</FormLabel >
                        {CustomError(errors[modelField], displayError)}

                        <Field
                            className={displayError ? "form-control form-error" : "form-control"}
                            placeholder={input.placeholder}
                            component={input.component}
                            type={input.type}
                            name={modelField}
                            maxLength={input.maxLength}
                            minLength={input.minLength}
                            min={input.min}
                            max={input.max}
                            onChange={event => setFieldValue(modelField, event.target.value)}
                        />
                    </FormGroup>
                );
            }
        }

    }

    //Error messages
    const CustomError = (error, displayError) => {
        return displayError ? <p className="formik-error">{error}</p> : null;
    }

    //Renders form buttons
    const FormButtons = props.formButtons && props.formButtons.map((button, i) => {
        return (
            <Button type={button.submit ? "submit" : "button"} key={i} className={button.className} variant={button.variant} size={button.size} onClick={button.onClick}>
                {button.label}
            </Button>
        );
    });

    //Maps form inputs
    const FormInputs = (values, setFieldValue, errors, touched) => props.formInputs.form && props.formInputs.form.map((input) => {
        return RenderInput(props.formInputs.model, input, values[props.formInputs.model][input.name], setFieldValue, errors, touched)
    });

    //Maps form inputs
    const NestedInputs = (model, values, setFieldValue, errors, touched) => model.form && model.form.map((input) => {
        return RenderInput(model.model, input, values[model.model][input.name], setFieldValue, errors, touched)
    });

    //Tabbed Form Render
    const RenderTabForm = (values, setFieldValue, errors, touched) => {
        return (
            <Tabs>
                {props.multiFormInputs.map((model, index) => {
                    return (
                        <Tab key={index} eventKey={index} title={model.label}>
                            <br />
                            {NestedInputs(model, values, setFieldValue, errors, touched)}
                        </Tab>

                    )
                })
                }
            </Tabs>
        );
    }

    //Nested Model Forms Render
    const RenderNestedForm = (values, setFieldValue, errors, touched) => {
        return (
            props.multiFormInputs.map((model, index) => {
                return (
                    <Card key={index}>
                        <h4>{model.label}</h4>
                        {NestedInputs(model, values, setFieldValue, errors, touched)}
                        <h6>{`Model: ${model.model}`}</h6>
                    </Card>);
            })
        );
    }

    
    if ((!isNullOrUndefined(props.initialValues) && props.editMode) || !props.editMode) {
        return (
            <Formik
                initialValues={initialValues}
                className={props.className}
                validate={values => {
                    return props.validate(values);
                }}
                onSubmit={(values) => {
                    props.handleSubmit(values)
                }}
            >
                {({ values, setFieldValue, errors, touched }) => (
                    <Form>
                        {props.tabbed ? RenderTabForm(values, setFieldValue, errors, touched) :
                            props.nested ? RenderNestedForm(values, setFieldValue, errors, touched) :
                                FormInputs(values, setFieldValue, errors, touched)}
                        <ButtonToolbar>
                            {FormButtons}
                        </ButtonToolbar>
                    </Form>
                )}
            </Formik>
        );
    }else{
        return <p>Loading . . .</p>;
    }
}

export default FormTemplate;