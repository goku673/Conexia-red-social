import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Publicaciones = () => {
  const publicaciones = useSelector(state => state.publicacion.publicaciones);

  const [like, setLike] = useState(false);

  const handleClickLike = () => {
    setLike(!like);
  }


  return (
    <div className="space-y-4">
      {publicaciones.map((post) => {
        let fecha = new Date(post.fecha);
        let fechaLegible = fecha.toLocaleString();
        const [comentariosVisibles, setComentariosVisibles] = useState(false);
        const [nuevoComentario, setComentarioNuevo] = useState('');
        const handlePublicarComentario = () => {
          console.log(nuevoComentario);
          setComentarioNuevo('');
          window.alert('pensa que esta comentando papito')
        }
        return (
          <div key={post.idPublicacion} className="bg-white shadow rounded-lg p-6" style={{ backgroundColor: post.colorFondo, color: post.colorTexto }}>
            <h2 className="text-2xl font-bold mb-2">{post.review}</h2>

            <p className="text-sm text-gray-500 mb-2">Publicado por: {post.usuarioQuienPublico.nombre}</p> {/* Necesitarás reemplazar esto con el nombre del usuario cuando establezcas esa relación en tu backend */}
            <p className="text-sm text-gray-500 mb-2">Fecha: {fechaLegible}{fechaLegible}</p>
            {post.imagenURL && <img className="w-full h-64 object-cover mb-2 rounded" src={post.imagenURL} alt="Imagen de la publicación" />}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Comentarios</h3>
              {/* Muestra los comentarios si comentariosVisibles es true */}
              {comentariosVisibles && (
                <>
                  {post.Comentarios.map((comentario) => (
                    <div
                      key={comentario.idComentario}
                      className="bg-color3 p-3 rounded-lg mb-2 overflow-auto"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={comentario.usuarioComentario.imagenURL}
                        />
                        <p className="font-bold text-color4">
                          {comentario.usuarioComentario.nombre}
                        </p>
                      </div>
                      <p>
                        {comentario.comentario}
                      </p>
                    </div>
                  ))}
                  <div className='flex'>
                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      type="text"
                      value={nuevoComentario}
                      onChange={(e) => setComentarioNuevo(e.target.value)}
                      placeholder="Escribe un comentario..."
                    />

                    <button
                      className='bg-color5 hover:bg-color6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      onClick={handlePublicarComentario}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>



                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1  text-gray-400 hover:text-blue-600" onClick={handleClickLike}>
                <FontAwesomeIcon icon={faThumbsUp} /> {/* Icono de "me gusta" */}
                <span>{44}</span> {/* Cantidad de likes */}
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-600" onClick={() => setComentariosVisibles(!comentariosVisibles)}>
                <FontAwesomeIcon icon={faComment} /> {/* Icono de comentarios */}
                <span>{post.Comentarios.length}</span> {/* Cantidad de comentarios. Asegúrate de reemplazar esto con la cantidad correcta cuando establezcas esa relación en tu backend */}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Publicaciones;