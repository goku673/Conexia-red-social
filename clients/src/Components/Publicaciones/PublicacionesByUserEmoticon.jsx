import React from 'react'
import { changeUsuarioConPublicacionesModal } from '../Redux/slice';
import { comentar, darLikeODislike, publicacionesPorIdUser, traerPublicaciones } from '../Redux/slicePublicaciones';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faUsers, faComment, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useCallback } from 'react';
// este componte es de es para mostrar la informacion que de las  personas que dieron like a la  publicacion y de ahi para mostrar la informacion

const PublicacionesByUserEmoticon = () => {
    const dispatch = useDispatch();
    const { userByID } = useSelector(state => state.usuario); // aqui me da el usuario con el que hago click
    const { publicacionIdUser } = useSelector(state => state.publicacion);//  aqui me da las publicaciones de ese usuaario que hice click
    const [comentariosVisibles, setComentariosVisibles] = useState({});  // para lo comentarios
    const {userID} = useSelector(state => state.usuario.user);
    const [nuevosComentarios, setNuevosComentarios] = useState({});     // para nuevo s comentarios
    const [like, setLike] = useState({}); // para los likes
    const [publicacionMostrandoLikes, setPublicacionMostrandoLikes] = useState(null); // no tengo idea todavia de esto 

    const handelClickRegresar = () => {
        dispatch(changeUsuarioConPublicacionesModal(false));
    }
    
    console.log("dimelo papi",userID)
    const handleClickLike = async (idPublicacion) => {
        await dispatch(darLikeODislike(idPublicacion));
        setLike(prevLike => ({ ...prevLike, [idPublicacion]: !prevLike[idPublicacion] }));
        dispatch(publicacionesPorIdUser(userByID.id));
    }

    const handlePublicarComentario = useCallback(async (idPublicacion) => {
        const comentario = nuevosComentarios[idPublicacion];
        if (comentario && comentario.trim()) {
            await dispatch(comentar({ comentario, idPublicacion }))
                .unwrap() // Esto asume que usar createAsyncThunk devuelve una promesa que puede ser "unwrapped"
                .then(() => {
                    setNuevosComentarios(prevComentarios => ({ ...prevComentarios, [idPublicacion]: '' }));
                    dispatch(publicacionesPorIdUser(userByID.id));
                })
                .catch((error) => {
                    console.error('Error al publicar comentario:', error);
                });
        }
    }, [dispatch, nuevosComentarios, userByID.id]);

    const toggleComentariosVisibles = useCallback((idPublicacion) => {
        setComentariosVisibles(prevVisibles => ({ ...prevVisibles, [idPublicacion]: !prevVisibles[idPublicacion] }));
    }, []);

    const yaLeDiLike = useCallback((emoticons, userId) => {
        return emoticons.some(emoticon => emoticon.usuarioEmoticon.id === userId);
    }, []);

    const handleKeyPress = (e, idPublicacion) => {
        if (e.key === 'Enter') {
            handlePublicarComentario(idPublicacion);
        }
    }

    return (

        <div className=' p-4 rounded-lg mt-4 ml-4 md:ml-0 mr-4 md:mr-0 '>
            <div className='flex justify-between items-center'>
                <button onClick={handelClickRegresar} className='text-color5 hover:text-color2 font-bold py-2 px-4 rounded'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
            <div className="relative w-full h-44">
                <img src={userByID?.imagenURLPortada} alt='portada no disponible' className='w-full h-48 rounded-t-lg object-cover' />
                <img src={userByID?.imagenURL} alt='perfil no disponible' className='relative -top-20 w-32 h-32 mx-auto rounded-full border-4 border-color1' />
            </div>
            <h2 className='mt-16 mb-4 text-2xl font-bold text-center text-color5'>{userByID?.nombre}</h2>
            <p className='px-6 mt-4 mb-8 text-center text-color5'>{userByID?.resenia || "no hay resenia disponible"}</p>
            <p className='text-center text-xs text-color3'>Fecha de registro: {new Date(userByID?.fechaRegistro).toLocaleDateString()}</p>
            <div>
                <h1 className='text-bold text-color2'>Publicaciones de {userByID?.nombre}</h1>
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
                                            <button className='text-lg font-semibold' onClick={() => toggleComentariosVisibles(publicacion.idPublicacion)} >Comentarios</button>
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
                                               <button className='bg-color5 hover:bg-color6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => handlePublicarComentario(publicacion.idPublicacion)}>
                                                <FontAwesomeIcon icon={faPaperPlane} />
                                              </button>
                                            </div>
                                   

                                            {publicacion.Comentarios.map((comentario) => (
                                                <div key={comentario.idComentario} className='bg-color3 p-3 rounded-lg mb-2 overflow-auto'>
                                                    <div className='flex items-center space-x-3'>
                                                        <img className='h-10 w-10  rounded-full' src={comentario.usuarioComentario.imagenURL} />
                                                        <p className='font-bold text-color4'>{comentario.usuarioComentario.nombre}</p>
                                                    </div>
                                                    <p>{comentario.comentario}</p>
                                                </div>
                                            ))}
                                           
                                        </>
                                    )}
                                    <div className=' flex items-center space-x-2'>
                                        <button className={`flex items-center space-x-1 ${yaLeDiLike(publicacion.Emoticons,userID) ? 'text-color2' : 'text-color4'}`} onClick={() => { handleClickLike(publicacion.idPublicacion); setPublicacionMostrandoLikes(publicacion.idPublicacion) }}>
                                            <FontAwesomeIcon icon={faThumbsUp} /> {/* Icono de "me gusta" */}
                                            <span>{publicacion.Emoticons.length}</span> {/* Cantidad de likes */}
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
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default PublicacionesByUserEmoticon;