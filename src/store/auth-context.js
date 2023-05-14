import React,{useEffect, useState} from "react";


const AuthContext = React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin:(email,password)=>{}
});
export const AuthContextProvider=(props)=>{
    const [isLoggedIn, setIsLoggedIn]=useState(false);
      // runs only once because it has no dependencies 
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedLoggedIn === '1') {
      setIsLoggedIn(true);
    }
  }, [])
    const loginHandler=()=>{
    const storedLoggedIn = localStorage.getItem('isLoggedIn');

        setIsLoggedIn(true)
    }
    const logoutHandler=()=>{
    localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false)
    }
    return <AuthContext.Provider value={{
        isLoggedIn:isLoggedIn,
        onLogout:logoutHandler,
        onLogin:loginHandler
    }}>
        {props.children}
    </AuthContext.Provider>
}


//  we need to provide the context in App.js for whole project
export default AuthContext;