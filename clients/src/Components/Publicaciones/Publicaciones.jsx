import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faPaperPlane, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { traerPublicaciones } from '../Redux/slicePublicaciones';
import { comentar } from '../Redux/slicePublicaciones';
import { darLikeODislike } from '../Redux/slicePublicaciones';
import Modal from 'react-modal';
import { userById } from '../Redux/slice';


const Publicaciones = () => {

  const dispatch = useDispatch();
  const publicaciones = useSelector(state => state.publicacion.publicaciones);
  const { userID } = useSelector((state) => state.usuario.user);
  const { userByID } = useSelector((state) => state.usuario);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [modalActivo, setModalActivo] = useState(null);
  const [comentariosVisibles, setComentariosVisibles] = useState({});
  const [nuevosComentarios, setNuevosComentarios] = useState({});
  const [like, setLike] = useState({});
  const [publicacionMostrandoLikes, setPublicacionMostrandoLikes] = useState(null);

  const handleClickLike = async (idPublicacion) => {
    await dispatch(darLikeODislike(idPublicacion));
    setLike(prevLike => ({ ...prevLike, [idPublicacion]: !prevLike[idPublicacion] }));
    dispatch(traerPublicaciones());

  }

  const abrirModalLikes = (idPublicacion) => {
    setPublicacionMostrandoLikes(idPublicacion);
    console.log(idPublicacion);
    //console.log(publicaciones[0].Emoticons.usuarioEmoticon);
    console.log(publicaciones[0].Emoticons[0].usuarioEmoticon.nombre)
    setModalActivo('modal2');
  }

  return (
    <div className="space-y-4">
      {publicaciones.map((post) => {
        let fecha = new Date(post.fecha);
        let fechaLegible = fecha.toLocaleString();
        const handlePublicarComentario = async (idPublicacion) => {
          await dispatch(comentar({ comentario: nuevosComentarios[idPublicacion], idPublicacion: idPublicacion }));
          setNuevosComentarios({
            ...nuevosComentarios,
            [idPublicacion]: ''
          });
          dispatch(traerPublicaciones());
        }

        const yaLeDiLike = (emoticons) => {
          return emoticons.some(emoticon => emoticon.usuarioEmoticon.id === userID);
        }

        return (
          <div key={post.idPublicacion} className="bg-white shadow rounded-lg p-6" style={{ backgroundColor: post.colorFondo, color: post.colorTexto }}>
            <h2 className="text-2xl font-bold mb-2">{post.review}</h2>
            <p className="text-sm text-gray-500 mb-2">Publicado por: {post.usuarioQuienPublico.nombre}</p> {/* Necesitarás reemplazar esto con el nombre del usuario cuando establezcas esa relación en tu backend */}
            <p className="text-sm text-gray-500 mb-2">Fecha: {fechaLegible}{fechaLegible}</p>
            {post.imagenURL && <img className="w-full h-64 object-cover mb-2 rounded" src={post.imagenURL} alt="Imagen de la publicación" />}
            <div className="space-y-2">
              {comentariosVisibles[post.idPublicacion] && (
                <>
                  <h3 className="text-lg font-semibold">Comentarios</h3>
                  {post.Comentarios.map((comentario) => (
                    <div
                      key={comentario.idComentario}
                      className="bg-color3 p-3 rounded-lg mb-2 overflow-auto"
                    >

                      <div className="flex items-center space-x-3">
                        <img className="h-10 w-10 rounded-full" src={comentario.usuarioComentario.imagenURL}/>
                        <p className="font-bold text-color4">{comentario.usuarioComentario.nombre}</p>
                      </div>
                      <p>{comentario.comentario} </p>
                    </div>
                  ))}
                  <div className='flex'>
                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      type="text"
                      value={nuevosComentarios[post.idPublicacion] || ''}
                      onChange={(e) => setNuevosComentarios({
                        ...nuevosComentarios,
                        [post.idPublicacion]: e.target.value
                      })}
                      placeholder="Escribe un comentario..."
                    />

                    <button
                      className='bg-color5 hover:bg-color6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      onClick={() => handlePublicarComentario(post.idPublicacion)}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button className={`flex items-center space-x-1 ${yaLeDiLike(post.Emoticons) ? 'text-color2' : ''}`} onClick={() => { handleClickLike(post.idPublicacion); setPublicacionMostrandoLikes(post.idPublicacion) }}>
                <FontAwesomeIcon icon={faThumbsUp} /> {/* Icono de "me gusta" */}
                <span>{post.Emoticons.length}</span> {/* Cantidad de likes */}
              </button>
              <button>
                <FontAwesomeIcon icon={faUsers} onClick={() => abrirModalLikes(post.idPublicacion)} />
              </button>

              <button
                className="flex items-center space-x-1  hover:text-color2"
                onClick={() => setComentariosVisibles({
                  ...comentariosVisibles,
                  [post.idPublicacion]: !comentariosVisibles[post.idPublicacion]
                })}
              >
                <FontAwesomeIcon icon={faComment} /> {/* Icono de comentarios */}
                <span>{post.Comentarios.length}</span> {/* Cantidad de comentarios. Asegúrate de reemplazar esto con la cantidad correcta cuando establezcas esa relación en tu backend */}
              </button>

            </div>
          </div>
        )
      })}
      <Modal
        isOpen={modalActivo === 'modal2'}
        onRequestClose={() => setModalActivo('')}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="bg-gray-900 bg-opacity-50 overflow-y-auto"
      >
        <div className="relative bg-color10 w-11/12 md:w-2/3 shadow-lg rounded-lg overflow-y-auto max-h-screen flex items-center justify-center">
          <button onClick={() => setModalActivo('')} className="absolute top-0 right-0 mt-4 mr-4 text-3xl text-gray-400 hover:text-gray-600 transition">
            x
          </button>

          <div className="py-2 px-4">
            <h1 className="text-xl font-bold mb-2 text-color2">Usuarios que le dieron like a la publicación</h1>
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
                      <button className="bg-color5 text-white px-2 py-1 rounded text-sm" onClick={() => { dispatch(userById(emoticon.usuarioEmoticon.id)); setShowUserInfo(true); }}>
                        <FontAwesomeIcon icon={faUser} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {userByID && showUserInfo && (
            <div className="bg-color1 p-4 rounded-lg shadow-lg ml-4 w-1/2">
              <button onClick={() => setShowUserInfo(false)} className="bg-color2 text-white px-2 py-1 rounded absolute top-0 right-0 mt-4 mr-24">
                x
              </button>
              <div className="flex items-center space-x-4 mb-4">
                <img className="w-24 h-24 object-cover rounded-full" src={userByID.imagenURL} alt={userByID.nombre} />
                <div>
                  <h1 className="text-color2 text-2xl font-bold">{userByID.nombre}</h1>
                  <p className="text-color4">-------------------</p>
                  <p className="text-color5">Fecha de registro: {new Date(userByID.fechaRegistro).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-color3">{userByID.resenia ? userByID.resenia : "No tiene reseña"}</p>
              <img className="w-full h-64 object-cover mt-4 rounded" src={userByID.imagenURLPortada} alt="Portada" />
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default Publicaciones;