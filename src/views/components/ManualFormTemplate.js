import React from 'react';
import { Form, FormControl, ControlLabel, ButtonToolbar, FormGroup, Button, InputGroup, Glyphicon, Checkbox, Radio } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

let ManualFormTemplate = (props) =>{
   
    const defaultClass = "form-input";
    const defaultComponentClass = "input";
    const defaultFileAccept = "*";

    //renders radio component
    const RadioButtonInputs = (input) => (props.radioButtonInput && 
        props.radioButtonInput.map((radio, i)=>{
            if(radio.name === input.name){
                return(
                    <Radio
                        key = {i}
                        inline = {input.inline}
                        value = {radio.value}
                        name = {radio.name}
                        onChange = {props.handleInputChange}
                        checked = {props[radio.name] === (radio.value)} 
                        disabled = {input.disabled || props.disabled}
                    >
                        {radio.label}
                    </Radio>
                )    
            }
            return "";
        })
    );

    //renders checkbox component
    const CheckboxInputs = (input) => (props.checkBoxInput && 
        props.checkBoxInput.map((checkbox, i)=>{
            if(checkbox.name === input.name){
                return(
                    <Checkbox
                        key = {i}
                        inline = {input.inline}
                        value = {checkbox.value}
                        name = {checkbox.name}
                        onChange = {props.handleCheckboxChange}
                        checked = {props[checkbox.name].includes(checkbox.value)} 
                        disabled = {input.disabled || props.disabled}
                    >
                        {checkbox.label}
                    </Checkbox>
                )    
            }
            return "";
        })
    );

    function RenderInput(input){
        switch(input.type){

            //renders radio buttons
            case "static":{
                return(
                    <FormGroup key={input.name} className={defaultClass}>
                        <ControlLabel>{input.label}</ControlLabel>
                        <FormControl.Static>{props[input.name]}</FormControl.Static>
                    </FormGroup>
                );
            }

            //renders radio buttons
            case "radio":{
                return(
                    <FormGroup key={input.name} className={defaultClass} validationState={input.validationState}>
                        <ControlLabel>{input.label}</ControlLabel>
                        {input.inline ? <br/> : ""}
                        {RadioButtonInputs(input)}
                    </FormGroup>
                );
            }

            //renders checkboxes
            case "checkbox":{
                return(
                    <FormGroup key={input.name} className={defaultClass} validationState={input.validationState}>
                        <ControlLabel>{input.label}</ControlLabel>
                        {input.inline ? <br/> : ""}
                        {CheckboxInputs(input)}
                    </FormGroup>
                );
            }

            //renders select input
            case "select": {
                return(
                    <FormGroup key={input.name} className={defaultClass} validationState={input.validationState}>
                        <ControlLabel>{input.label}</ControlLabel>
                        <InputGroup>
                            <FormControl
                                componentClass={input.componentClass ? input.componentClass : defaultComponentClass}
                                name={input.name}
                                value={props[input.name]}
                                onChange={props.handleInputChange}
                                required={input.required}
                                disabled={input.disabled || props.disabled}
                                className={input.className}
                            >
                            <option disabled value="">{input.placeholder}</option>
                            {props.selectInput && props.selectInput.filter((option)=>option.name===input.name).map((item, i)=>{
                                return(
                                    <option key={i} value={item.value}> {item.label} </option>
                                );
                            })}
                            </FormControl>

                            <InputGroup.Addon className="form-control-feedback">
                                <Glyphicon glyph="chevron-down" />
                            </InputGroup.Addon>

                        </InputGroup>
                    </FormGroup>
                );
            }

            //renders file upload
            case "file":{
                return(
                    <FormGroup key={input.name} className={defaultClass} validationState={input.validationState}>
                        <ControlLabel>{input.label}</ControlLabel>
                        <FormControl
                            type={input.type}
                            name={input.name}
                            onChange={props.handleInputChange}
                            required={input.required}
                            disabled={input.disabled || props.disabled}
                            className={input.className}
                            accept={input.accept ? input.accept : defaultFileAccept}
                        />
                    </FormGroup>
                );
            }

            //renders datepicker field
            case "datepicker":{
                return(
                    <FormGroup key={input.name} className={defaultClass} validationState={input.validationState}>
                        <ControlLabel>{input.label}</ControlLabel>
                            <DatePicker
                                name={input.name}
                                selected={moment(props[input.name], input.format)}
                                onChange={props.handleDateChange.bind(this,input.name,input.format)}
                                placeholderText={input.placeholder}
                            />
                    </FormGroup>
                );
            }
            

            //renders text, textarea, email, password, numbers, default input
            default: {
                return(
                    <FormGroup key={input.name} className={defaultClass} validationState={input.validationState}>    
                        <ControlLabel>{input.label}</ControlLabel>
                        <FormControl
                            type={input.type}
                            componentClass={input.componentClass ? input.componentClass : defaultComponentClass}
                            placeholder={input.placeholder}
                            minLength={input.minLength}
                            maxLength={input.maxLength}
                            max={input.max}
                            min={input.min}
                            name={input.name}
                            value={props[input.name]}
                            onChange={props.handleInputChange}
                            required={input.required}
                            disabled={input.disabled || props.disabled}
                            className={input.className}
                        />
                    </FormGroup>
                );
            }
        }

    }

    //Maps form inputs
    const FormInputs = props.formInputs && props.formInputs.map((input)=>{
        return RenderInput(input)
    });

    //Renders form buttons
    const FormButtons = props.formButtons && props.formButtons.map((button, i)=>{
        return(
            <Button key={i} className={button.className} bsStyle={button.bsStyle} bsSize={button.bsSize} onClick={button.onClick}>
                {button.label}
            </Button>
        );
    });
    

    return(
        <div>
            <Form onSubmit={props.handleSubmit} className={props.className}>
                {FormInputs}
                <ButtonToolbar className={defaultClass}>
                    {FormButtons}
                </ButtonToolbar>
            </Form>
        </div>
    );
}

export default ManualFormTemplate;