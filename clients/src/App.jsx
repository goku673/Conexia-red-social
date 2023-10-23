import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/view/login';
import RegisterUser from './Components/view/RegisterUser';

function App() {


  return (
    <>
     <Routes>
           <Route path='/'  element={<Login/>}/>
           <Route path='/register' element ={<RegisterUser/>}/>
     </Routes>
    </>
  )
}

export default App
