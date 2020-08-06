import React, { useState } from 'react';
import Routes from './Routes';
import Nav from './shared/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Axios from 'axios';

function App() {

  const [user, setUser] = useState(false);
  // const resp = Axios.get('/test').then(resp => {
  //   console.log(resp.data.message);
  // });

  return (
    <React.Fragment>
      <ToastContainer/>
      <Nav user={user}/>
      <Routes user ={user} setUser={setUser}/>
    </React.Fragment>
  );
}

export default App;