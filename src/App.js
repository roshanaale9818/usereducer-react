import React, { useState, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';


function App() {

  const ctx = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };


  // // runs only once because it has no dependencies 
  // useEffect(() => {
  //   const storedLoggedIn = localStorage.getItem('isLoggedIn');
  //   if (storedLoggedIn === '1') {
  //     setIsLoggedIn(true);
  //   }
  // }, [])

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <React.Fragment>
      <MainHeader/>
      <main>
        {!ctx.isLoggedIn && <Login  />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  )
    // we provide context here and listen in components
{/* <AuthContext.Provider value={{isLoggedIn:isLoggedIn,onLogout:logoutHandler}}> */}
    // <React.Fragment>
    //   <MainHeader/>
    //   <main>
    //     {!ctx.isLoggedIn && <Login  />}
    //     {ctx.isLoggedIn && <Home />}
    //   </main>
    // </React.Fragment>
    // </AuthContext.Provider>
  ;
}

export default App;
