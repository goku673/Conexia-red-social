import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/view/Login';
import RegisterUser from './Components/view/RegisterUser';
import UserProfile from './Components/Publicaciones/UserProfile';
import EditProfile from './Components/Profile/EditProfile';
import EditPublicacion from './Components/Publicaciones/EditPublicacion';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<RegisterUser />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='edit-for-publication' element={<EditPublicacion />} />
        <Route path='/edit-profile' element={<EditProfile />} />

      </Routes>
    </>
  )
}

export default App



