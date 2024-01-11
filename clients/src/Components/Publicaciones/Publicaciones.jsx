import React, { useEffect ,useState} from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faPaperPlane, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import { traerPublicaciones,darLikeODislike, comentar} from '../Redux/slicePublicaciones';
//import { comentar } from '../Redux/slicePublicaciones';
//import Modal from 'react-modal';
//import { userById } from '../Redux/slice';
import PublicacionModal from './PublicacionModal';
import { changeUsuarioConPublicacionesModal } from '../Redux/slice';
import PublicacionesByUserEmoticon from './PublicacionesByUserEmoticon';

const Publicaciones = () => {

  const dispatch = useDispatch();
  const publicaciones = useSelector(state => state.publicacion.publicaciones);
  const { userID } = useSelector((state) => state.usuario.user);
  const { userByID } = useSelector((state) => state.usuario);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [modalActivo, setModalActivo] = useState(null);
  const [comentariosVisibles, setComentariosVisibles] = useState({}); // comentario
  const [nuevosComentarios, setNuevosComentarios] = useState({}); //comentario
  const [like, setLike] = useState({});
  const [publicacionMostrandoLikes, setPublicacionMostrandoLikes] = useState(null);
  const {usuarioConPublicacionesModal} = useSelector(state => state.usuario);

  // cuando quiero dar Like esta relacionado con el id de la
  const handleClickLike = async (idPublicacion) => {
    await dispatch(darLikeODislike(idPublicacion));
    setLike(prevLike => ({ ...prevLike, [idPublicacion]: !prevLike[idPublicacion] }));
    dispatch(traerPublicaciones());
  }
  console.log("ssss",like);
  console.log("nuevosComentarios",nuevosComentarios);
  console.log("comentariosVisibles",comentariosVisibles);
  //console.log("bbb",userByID);

  const abrirModalLikes = (idPublicacion) => {
    setPublicacionMostrandoLikes(idPublicacion);
    console.log(idPublicacion);
    //console.log(publicaciones[0].Emoticons.usuarioEmoticon);
    console.log(publicaciones[0].Emoticons[0].usuarioEmoticon.nombre)
    setModalActivo('modal2');
  }

  return (
    <div className="space-y-4 bg-color9 text-white p-6 rounded-lg">
     {usuarioConPublicacionesModal && <PublicacionesByUserEmoticon/>}

      { !usuarioConPublicacionesModal && publicaciones.map((post) => {
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
            <p className="text-sm text-gray-500 mb-2">Fecha: {fechaLegible}</p>
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
                        <img className="h-10 w-10 rounded-full" src={comentario.usuarioComentario.imagenURL} />
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
        <PublicacionModal
          modalActivo={modalActivo}
          setModalActivo={setModalActivo}
          publicaciones = {publicaciones}
          publicacionMostrandoLikes={publicacionMostrandoLikes}
          dispatch={dispatch}
          />
    </div>
  )
}

export default Publicaciones;