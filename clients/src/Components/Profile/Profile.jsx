import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { googleAuth } from '../Redux/slice';
import Modal from 'react-modal';
import { useState } from 'react';
import EditProfile from './EditProfile';

const Profile = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (!usuario.user) {
      dispatch(googleAuth());
    }
  }, [])

  // Convertir la fecha de registro a un formato más legible
  // mejorar la conexion con fire base y arreglar el problema que hay  

  const fechaRegistro = new Date(usuario.user.fechaRegistro).toLocaleDateString();

  return (
    <div className="flex flex-col items-center p-16 bg-color4 shadow-md rounded-lg">
      <div className="relative w-full h-32">
        <img
          src={usuario.user.imagenURLPortada || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmM9klXYslww7TPuLWfEUOoQMJk89GBVTI7A&usqp=CAU"}
          alt="Cover"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <img
          src={usuario.user.imagenURL || "default_profile_image_url"}
          alt="Profile"
          className="absolute bottom-0 -mb-6 w-24 h-24 border-4 border-color1 rounded-full"
        />
      </div>
      <h2 className="mt-8 mb-2 text-xl font-bold text-color5">{usuario.user.nombre}</h2>
      <p className="mb-4 text-color5">{usuario.user.email}</p>
      <p className="mb-4 text-center text-color5">{usuario.user.resenia || "No hay reseña disponible"}</p>
      <p className="mb-4 text-sm text-color2">Se unió el {fechaRegistro}</p>

      <button onClick={() => setModalIsOpen(true)} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Editar perfil
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="bg-gray-900 bg-opacity-50 overflow-y-auto"
      >
        <div className="relative bg-white w-11/12 md:w-1/3 shadow-lg rounded-lg">
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="py-4 px-6">
            <EditProfile />
          </div>
        </div>

      </Modal>

    </div>
  );
};

export default Profile;