import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { comentar } from '../Redux/slicePublicaciones';

const SearchUser = ({ user }) => {
  const { publicacionIdUser } = useSelector(state => state.publicacion);
  const [comentariosVisibles, setComentariosVisibles] = useState({});
  const [nuevosComentarios, setNuevosComentarios] = useState({});
  console.log("Pepito", publicacionIdUser);
  return (
    <div className='bg-color1 p-4 rounded-lg mt-4 ml-4 md:ml-0 mr-4 md:mr-0 shadow-lg'>
      <div className="relative w-full h-44">
        <img src={user?.imagenURLPortada} alt="Portada no disponible" className="w-full h-48 rounded-t-lg object-cover" />
        <img src={user?.imagenURL} alt="Profile" className="relative -top-20 w-32 h-32 mx-auto rounded-full border-4 border-color1" />
      </div>
      <h2 className="mt-16 mb-4 text-2xl font-bold text-center text-color5">{user?.nombre}</h2>
      <p className="px-6 mt-4 mb-8 text-center text-color3">{user?.resenia || "No hay reseña disponible"}</p>
      <p className="text-center text-xs text-color3">Fecha de registro: {new Date(user?.fechaRegistro).toLocaleDateString()}</p>

      <div>
        <h1>publicaciones</h1>
        {publicacionIdUser.length === 0 ? (
          <p>No hay publicaciones de este usuario</p>
        ) : (
          publicacionIdUser.map(publicacion => {
            let fecha = new Date(publicacion.fecha);
            let fechaLegible = fecha.toLocaleString();
            return (
              <div key={publicacion.idPublicacion} className='bg-white shadow rounded-lg p-6 mb-2' style={{ backgroundColor: publicacion.colorFondo }}>
                <h2 className='text-2x1 font-bold mb-2'>{publicacion.review}</h2>
                <p className='text-sm text-gray-500 mb-2'>Publicado por : {publicacion.usuarioQuienPublico.nombre}</p>
                <p>Fecha : {fechaLegible}</p>
                {publicacion.imagenURL && <img src={publicacion.imagenURL} className='w-full h-64 object-cover mb-2 rounded' alt='imagen de publicaion'/>}
                <div className='space-y-2'>
                  {comentariosVisibles[publicacion.idPublicacion] && (
                     <>
                       <h3 className='text-lg font-semibold'>Comentarios</h3>
                       <input 
                          className='shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          type='text'
                          
                      />
                       {publicacion.Comentarios.map((comentario) => (
                         <div key={comentario.idComentario} className='bg-color3 p-3 rounded-lg mb-2 overflow-auto'>
                             <div className='flex items-center space-x-3'>
                                <img className='h-10 w-10  rounded-full' src={comentario.usuarioComentario.imagenURL}/>
                                <p className='font-bold text-color4'>{comentario.usuarioComentario.nombre}</p>
                             </div>
                             <p>{comentario.comentario}</p>
                         </div>
                       ))}

                     </>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

    </div>
  )
}

export default SearchUser;