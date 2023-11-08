import React, { useEffect } from 'react';
import Profile from '../Profile/Profile';

import Publicaciones from './Publicaciones';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUpload} from '@fortawesome/free-solid-svg-icons';
import EditProfile from '../Profile/EditProfile';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {
   

     
    return (
        <div className="min-h-screen bg-color1 flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 bg-color2 p-4">
            <div className="flex items-center justify-center space-x-4">
              <Profile/>
            </div>
            <div className="mt-4">
              <h3 className="text-color8">Your Posts</h3>
              {/* Map over your posts here */}
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-color3 p-4 overflow-auto" style={{ maxHeight: '100vh' }}>
             <div className='flex gap-2 items-center'>
                <NavLink to='/edit-for-publication' className='text-white bg-color2 justify-center border-color4 rounded py-2 px-4 '>Publicar   <FontAwesomeIcon icon={faUpload}/>
                </NavLink>
                <input  placeholder='buscar usuarios...'  className='w-1/2 py-2 px-4 rounded border-4 border-gray-300 focus:outline-none focus:border-color2 focus:w-3/4 transition-all'/>
            </div>
            <div className=' mt-4'>
            <Publicaciones/>
            </div>
          </div>
          <div className="w-full md:w-1/4 bg-color4 p-4 overflow-auto "  style={{ maxHeight: '100vh' }}>
            <h2 className="text-color10">Messages</h2>
            {/* Map over your messages here */}
            {[...Array(100)].map((_, i) => <p key={i}>Hola</p>)}
          </div>
        
        </div>
      );
}

export default UserProfile;