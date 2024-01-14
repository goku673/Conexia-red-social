import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { comentar, traerPublicaciones, darLikeODislike, publicacionesPorIdUser } from '../Redux/slicePublicaciones';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faUsers, faComment } from '@fortawesome/free-solid-svg-icons';

const SearchUser = ({ user }) => {
  const dispatch = useDispatch();
  const { publicacionIdUser } = useSelector(state => state.publicacion);
  const [comentariosVisibles, setComentariosVisibles] = useState({});
  const [nuevosComentarios, setNuevosComentarios] = useState({});
  const [like, setLike] = useState({});
  const [publicacionMostrandoLikes, setPublicacionMostrandoLikes] = useState(null);

  const handleClickLike = useCallback(async (idPublicacion) => {
    await dispatch(darLikeODislike(idPublicacion));
    setLike(prevLike => ({ ...prevLike, [idPublicacion]: !prevLike[idPublicacion] }));
    dispatch(publicacionesPorIdUser(user.id));
  }, [dispatch, user.id]);

  const handlePublicarComentario = useCallback(async (idPublicacion) => {
    const comentario = nuevosComentarios[idPublicacion];
    if (comentario && comentario.trim()) {
      await dispatch(comentar({ comentario, idPublicacion }))
        .unwrap() // Esto asume que usar createAsyncThunk devuelve una promesa que puede ser "unwrapped"
        .then(() => {
          setNuevosComentarios(prevComentarios => ({ ...prevComentarios, [idPublicacion]: '' }));
          dispatch(publicacionesPorIdUser(user.id));
        })
        .catch((error) => {
          console.error('Error al publicar comentario:', error);
        });
    }
  }, [dispatch, nuevosComentarios, user.id]);

  const toggleComentariosVisibles = useCallback((idPublicacion) => {
    setComentariosVisibles(prevVisibles => ({ ...prevVisibles, [idPublicacion]: !prevVisibles[idPublicacion] }));
  }, []);

  const yaLeDiLike = useCallback((emoticons, userId) => {
    return emoticons.some(emoticon => emoticon.usuarioEmoticon.id === userId);
  }, []);

  const handleKeyPress = (e, idPublicacion) => {
    //valor de e.key será 'Enter' si presiono enter en mi teclado
    if (e.key === 'Enter') {
      handlePublicarComentario(idPublicacion);
    }
  };

  return (
    <div className='bg-color9 p-4 rounded-lg mt-4 ml-4 md:ml-0 mr-4 md:mr-0 shadow-lg'>
      <div className="relative w-full h-44">
        <img src={user?.imagenURLPortada} alt="Portada no disponible" className="w-full h-48 rounded-t-lg object-cover" />
        <img src={user?.imagenURL} alt="Profile" className="relative -top-20 w-32 h-32 mx-auto rounded-full border-4 border-color1" />
      </div>
      <h2 className="mt-16 mb-4 text-2xl font-bold text-center text-color5">{user?.nombre}</h2>
      <p className="px-6 mt-4 mb-8 text-center text-color2">{user?.resenia || "No hay reseña disponible"}</p>
      <p className="text-center text-xs text-color2">Fecha de registro: {new Date(user?.fechaRegistro).toLocaleDateString()}</p>
      <div>
        <h1 className='text-bold text-color2'>Publicaciones de {user?.nombre}</h1>
        {publicacionIdUser.length === 0 ? (
          <p>No hay publicaciones de este usuario</p>
        ) : (
          publicacionIdUser.map(publicacion => {
            let fecha = new Date(publicacion.fecha);
            let fechaLegible = fecha.toLocaleString();

            return (
              <div key={publicacion.idPublicacion} className='bg-white shadow rounded-lg p-6 mb-2' style={{ backgroundColor: publicacion.colorFondo, color: publicacion.colorTexto }}>
                <h2 className='text-2x1 font-bold mb-2'>{publicacion.review}</h2>
                <p className='text-sm text-gray-500 mb-2'>Publicado por : {publicacion.usuarioQuienPublico.nombre}</p>
                <p>Fecha : {fechaLegible}</p>
                {publicacion.imagenURL && <img src={publicacion.imagenURL} className='w-full h-64 object-cover mb-2 rounded' alt='imagen de publicaion' />}
                <div className='space-y-2'>
                  {comentariosVisibles[publicacion.idPublicacion] && (
                    <>
                      <button className='text-lg font-semibold' onClick={() => toggleComentariosVisibles(publicacion.idPublicacion)}>Comentarios </button>
                      {publicacion.Comentarios.map((comentario) => (
                        <div key={comentario.idComentario} className='bg-color3 p-3 rounded-lg mb-2 overflow-auto'>
                          <div className='flex items-center space-x-3'>
                            <img className='h-10 w-10  rounded-full' src={comentario.usuarioComentario.imagenURL} />
                            <p className='font-bold text-color4'>{comentario.usuarioComentario.nombre}</p>
                          </div>
                          <p>{comentario.comentario}</p>
                        </div>
                      ))}
                      <div className='flex'>
                        <input
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          type='text'
                          value={nuevosComentarios[publicacion.idPublicacion] || ''}
                          onChange={(e) => setNuevosComentarios({
                            ...nuevosComentarios,
                            [publicacion.idPublicacion]: e.target.value
                          })}
                          onKeyPress={(e) => handleKeyPress(e, publicacion.idPublicacion)}
                          placeholder='Escribe un comentario...'
                        />

                        <button
                          className='bg-color5 hover:bg-color6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                          onClick={() => {
                            handlePublicarComentario(publicacion.idPublicacion);
                            dispatch(publicacionesPorIdUser(user.id));

                          }
                          }

                        >
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                      </div>
                    </>
                  )}
                  <div className='flex items-center space-x-2'>
                    <button className={`flex items-center space-x-1 ${yaLeDiLike(publicacion.Emoticons, user.id) ? 'text-color2' : 'text-color4'}`} onClick={() => handleClickLike(publicacion.idPublicacion)}>
                      <FontAwesomeIcon icon={faThumbsUp} />
                      <span>{publicacion.Emoticons.length}</span>
                    </button>
                    <button className='flex items-center space-x-1 hover: text-color2'
                      onClick={() => toggleComentariosVisibles(publicacion.idPublicacion)}
                    >
                      <FontAwesomeIcon icon={faComment} />
                      <span>{publicacion.Comentarios.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
export default SearchUser;