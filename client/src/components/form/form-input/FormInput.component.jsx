import React from 'react';
import './form-input.styles.css';

const FormInput = (props)=>{

    return (
        <input id = {props.id} className = {props.className? props.className : 'form-input'} 
               type={props.type ? props.type : 'text'} placeholder={props.placeholder} required = {props.required}/>
    );
};

export default FormInput;