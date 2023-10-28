import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/view/login';
import RegisterUser from './Components/view/RegisterUser';
import UserProfile from './Components/Publicaciones/UserProfile'; 
import EditProfile from './Components/Profile/EditProfile';

function App() {


  return (
    <>
     <Routes>
           <Route path='/'  element={<Login/>}/>
           <Route path='/register' element ={<RegisterUser/>}/>
           <Route path='/profile' element={<UserProfile/>}/>
           <Route path='/edit-profile' element ={<EditProfile/>}/>
     </Routes>
    </>
  )
}

export default App



