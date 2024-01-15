
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { userById } from '../Redux/slice';
import { publicacionesPorIdUser } from '../Redux/slicePublicaciones';
import { changeUsuarioConPublicacionesModal } from '../Redux/slice';

const PublicacionModal = ({ modalActivo, setModalActivo, publicaciones, publicacionMostrandoLikes, dispatch}) => {
  return (
    <Modal
      isOpen={modalActivo === 'modal2'}
      onRequestClose={() => setModalActivo('')}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="bg-gray-900 bg-opacity-50 overflow-y-auto"
    >
       <div className="relative bg-color10 w-11/12 md:w-2/3 shadow-lg rounded-lg overflow-y-auto max-h-screen flex items-center justify-center">
          <button onClick={() => setModalActivo('')} className="absolute top-0 right-0 mt-4 mr-4 text-3xl text-gray-400 hover:text-gray-600 transition">
             X
          </button>
          <div className="py-2 px-4">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Imagen</th>
                  <th className="py-3 px-6 text-left">Nombre</th>
                  <th className="py-3 px-6 text-center">Ver perfil</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {publicaciones.find(publicacion => publicacion.idPublicacion === publicacionMostrandoLikes)?.Emoticons.map((emoticon, index) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-8 w-8 rounded-full" src={emoticon.usuarioEmoticon.imagenURL} alt="Imagen del usuario" />
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center text-color2">
                        <span>{emoticon.usuarioEmoticon.nombre}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button className="bg-color5 text-white px-2 py-1 rounded text-sm"
                            onClick={async() => { 
                              await dispatch(userById(emoticon.usuarioEmoticon.id));
                               setModalActivo(null) ;
                              await dispatch(publicacionesPorIdUser(emoticon.usuarioEmoticon.id));
                               dispatch(changeUsuarioConPublicacionesModal(true));
                               //console.log(emoticon.usuarioEmoticon);
                               }
                              }
                            >
                        <FontAwesomeIcon icon={faUser} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </Modal>
  );
};

export default PublicacionModal;