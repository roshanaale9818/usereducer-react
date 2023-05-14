import React, { useRef,useImperativeHandle } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props,ref) => {
    // if ref is should be set from oustide  we need to wrap with forwardRef for setting Ref
    const inputRef = useRef();
    const activate = () => {
        inputRef.current.focus();
    }
    // second param is function that returns obj 
    useImperativeHandle(ref,()=>{
        return{
            focus:activate
        }
    })
    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor="email">{props.label}</label>
            <input
                ref={inputRef}
                type={props.type || 'text'}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}

            />
        </div>
    );
});

export default Input;
