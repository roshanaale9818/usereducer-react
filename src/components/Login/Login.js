import React, { useState, useEffect,useReducer, useContext, useRef ,useImperativeHandle} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';
const emailReducer =(state,action)=>{
  console.log("State",state);
  console.log("action",action)
  if(action.type==='USER_INPUT'){
    return {value:action.val,isValid:action.val.includes('@')}
  }
  if(action.type ==="INPUT_BLUR"){
    console.log("IN BLUR", state)
    return {value:state.value,isValid:state.value.includes('@')}
  }
  
  return {value:'',isValid:false};
}

const passwordReducer = (state,action)=>{
  if(action.type==="USER_INPUT"){
    return {value:action.val,isValid:action.val.trim().length>6}
  }
  if(action.type ==="INPUT_BLUR"){
    console.log("IN BLUR", state)
    return {value:state.value,isValid:state.value.includes('@')}
  }
  return {value:'',isValid:false};

}
const Login = (props) => {
  const authContext = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(()=>{
    console.log("USE EFFECTING")
  },[])

  const [emailState,dispatchEmail] = useReducer(emailReducer,{value:'',isValid:null});
  const [passwordState, dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null});

  const {isValid:emailIsValid}=emailState;
  const {isValid:passwordIsValid}=passwordState;
  useEffect(() => {

    const identifier = setTimeout(() => {
      console.log("checking for validity");
      setFormIsValid(
       passwordState.isValid && emailState.isValid
      );
    }, 500);
    return () => {
      //clean up process before 500 ms
      console.log("cleanup");
      clearTimeout(identifier);
    }
  }, [emailIsValid, passwordIsValid]);
  const emailChangeHandler = (event) => {
    // console.log("EVENTING IN EVENT",event.target.value)
    dispatchEmail({
      type:'USER_INPUT',
      val:event.target.value
    });
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.value.trim().length > 6
    // )
    // setEnteredEmail(event.target.value);
    // setEnteredEmail
    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      type:"USER_INPUT",
      val:event.target.value
    })

    // setFormIsValid(
    //   emailState.isValid&&event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({
      type:'INPUT_BLUR'
    })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({
      type:'INPUT_BLUR'
    })
  };


  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value, passwordState.value);
    if(formIsValid){
      authContext.onLogin(emailState.value, passwordState.value);
    }
    else if(!emailIsValid){
      emailRef.current.focus();
    }
    else{
      passwordRef.current.focus();
    }
   

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        <Input ref={emailRef} label='Email' type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            isValid={emailIsValid}
            />

        {/* <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
         <Input ref={passwordRef} label='Password' type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            isValid={passwordIsValid}
            />
        <div className={classes.actions}>
        {/* disabled={!formIsValid} */}
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
