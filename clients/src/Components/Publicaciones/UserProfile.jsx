import React from 'react';
import Profile from '../Profile/Profile';
import Modal from  'react-modal';
import EditProfile from '../Profile/EditProfile';
import { useState } from 'react';
const UserProfile = () => {

   const [modalIsOpen ,setModalIsOpen] = useState(false);

   const openModal  = () => {
     setModalIsOpen(true);
   }
   const closeModal = () => {
     setModalIsOpen(false);
   }
    return (
        <div className="min-h-screen bg-color1 flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 bg-color2 p-4">
            <div className="flex items-center space-x-4">
              <Profile/>
              <button onClick={openModal} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Editar perfil
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Editar perfil"
          >
            <EditProfile/>
            <button onClick={closeModal}>Cerrar</button>
          </Modal>
            </div>
            <div className="mt-4">
              <h3 className="text-color8">Your Posts</h3>
              {/* Map over your posts here */}
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-color3 p-4 overflow-auto" style={{ maxHeight: '100vh' }}>
            <h2 className="text-color9">Feed</h2>
            { /*  todos mis post aqui */ }
            {[...Array(100)].map((_, i) => <p key={i}>Hola</p>)}
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