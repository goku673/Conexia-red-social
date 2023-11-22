import React, { useState, useEffect } from 'react';
import Profile from '../Profile/Profile';
import Publicaciones from './Publicaciones';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { searchUserByName, clearUserByName, resetStatusGetUsers } from '../Redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import { userById } from '../Redux/slice';
import SearchUser from '../searchUser/searchUser';
import { publicacionesPorIdUser } from '../Redux/slicePublicaciones';

const UserProfile = () => {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('');
  const { usersByName, statusUsers } = useSelector((state) => state.usuario);
  const { userByID } = useSelector((state) => state.usuario);
  const [showUser, setShowUser] = useState(false);
  

  useEffect(() => {
    if (nombre) {
      dispatch(searchUserByName(nombre));
    } else {
      dispatch(clearUserByName());
      dispatch(resetStatusGetUsers());
      setShowUser(false);
    }
  }, [nombre, dispatch]);

  useEffect(() => {
    console.log(userByID);
  }, [userByID]);

  return (
    <div className="min-h-screen bg-color1 flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 bg-color2 p-4">
        <div className="flex items-center justify-center space-x-4">
          <Profile />
        </div>
        <div className="mt-4">
          <h3 className="text-color8">Your Posts</h3>
          {/* Map over your posts here */}
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-color3 p-4 overflow-auto" style={{ maxHeight: '100vh' }}>
        <div className='flex gap-2 items-center'>
          <NavLink to='/edit-for-publication' className='text-white bg-color2 justify-center border-color4 rounded py-2 px-4 '>Publicar   <FontAwesomeIcon icon={faUpload} />
          </NavLink>
          <input placeholder='buscar usuarios...' value={nombre} onChange={(e) => setNombre(e.target.value)} className='w-1/2 py-2 px-4 rounded border-4 border-gray-300 focus:outline-none focus:border-color2 focus:w-3/4 transition-all' />
        </div>
        {nombre && statusUsers === 'failed' && <p className='bg-color6 text-color2 text-center'>Usuario no encontrado!!!</p>}
        {showUser && usersByName.length > 0 && <SearchUser user={userByID}  />}
        {usersByName?.length > 0 && (
          <table className="w-full table-auto mt-8">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Imagen</th>
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-center">Ver perfil</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {usersByName.map(user => (
                <tr className="border-b border-gray-200 hover:bg-gray-100" key={user.id}>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-8 w-8 rounded-full" src={user.imagenURL} alt={user.nombre} />
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center text-color2">
                      <span>{user.nombre}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => {
                      dispatch(userById(user.id));
                      dispatch(publicacionesPorIdUser(user.id));
                      setShowUser(!showUser);
                    }} className="bg-color5 text-white px-2 py-1 rounded text-sm">
                      <FontAwesomeIcon icon={faUser} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className=' mt-4'>
          <Publicaciones />
        </div>
      </div>
      <div className="w-full md:w-1/4 bg-color4 p-4 overflow-auto " style={{ maxHeight: '100vh' }}>
        <h2 className="text-color10">Messages</h2>
        {/* Map over your messages here */}
        {[...Array(100)].map((_, i) => <p key={i}>Hola</p>)}
      </div>
    </div>
  );
}

export default UserProfile;