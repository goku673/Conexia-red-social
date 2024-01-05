import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { publicar } from '../Redux/slicePublicaciones';
import { ToastContainer, toast } from 'react-toastify';
import { resetStatusPublicar } from '../Redux/slicePublicaciones';
import { NavLink } from 'react-router-dom';
import { traerPublicaciones } from '../Redux/slicePublicaciones';

const EditPublicacion = () => {
  const dispath = useDispatch();
  const [review, setReview] = useState('');
  const { statusPublicar } = useSelector((state) => state.publicacion);
  const [colorFondo, setColorFondo] = useState('#ffffff'); // color blanco por defecto
  const [colorTexto, setColorTexto] = useState('#000000'); // color negro por defecto
  const [imagenPrevia, setImagenPrevia] = useState(null);
  const [imagen, setImagen] = useState(null);
  const usuario = useSelector((state) => state.usuario.user);
  const [showMessage, setShowMessage] = useState(false);
  console.log(statusPublicar);
  const handleImageUpload = (e) => {
    setImagenPrevia(URL.createObjectURL(e.target.files[0]));
    setImagen(e.target.files[0]);

  }

  useEffect(() => {
    if (statusPublicar === 'loading') {
      toast.loading('publicando');
    } else if (statusPublicar === 'succeeded') {
      toast.dismiss();
      toast.success('Publicacion publicada correctamente');
      dispath(traerPublicaciones());
      dispath(resetStatusPublicar());
    } else if (statusPublicar === 'failed') {
      toast.dismiss();
      toast.error('Hubo un error al publicar');
      dispath(resetStatusPublicar());
    }
  }, [statusPublicar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispath(publicar({ review, colorFondo, colorTexto, imagen }));
    setReview('');
    setColorFondo('');
    setColorTexto('');
    setImagen(null);


  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-500 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col bg-color4 p-8 rounded shadow-lg space-y-4 w-full md:w-1/2 md:mr-4 mb-4 md:mb-0">
        <NavLink className="text-color2 font-bold hover:text-red-500 relative group" to='/profile'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </NavLink>
        <h1 className="text-2xl mb-4 text-center text-color2">Editar Publicación</h1>
        <label className="flex flex-col space-y-2">
          <span className='text-color2'>Review:</span>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} className="border p-2 rounded" style={{ color: colorTexto, backgroundColor: colorFondo }} />
        </label>

        <div className="flex space-x-4">
          <label className="flex flex-col items-center">
            <span className='text-color2'>Selecciona el color del texto:</span>
            <input type="color" value={colorTexto} onChange={(e) => setColorTexto(e.target.value)} className="w-16 h-16 mt-2" />
          </label>

          <label className="flex flex-col items-center">
            <span className='text-color2'>Selecciona el color de fondo:</span>
            <input type="color" value={colorFondo} onChange={(e) => setColorFondo(e.target.value)} className="w-16 h-16 mt-2" />
          </label>
        </div>

        <label className="flex flex-col space-y-2">
          <span className='text-color2'>Sube una imagen:</span>
          <input className='text-color2' type="file" onChange={handleImageUpload} />
        </label>

        <button type="submit" className="mt-4   py-2 px-4 bg-color2  text-white rounded">Publicar<FontAwesomeIcon icon={faUpload} />
        </button>
      </form>

      <div className="w-full md:w-1/2">
        <h2 className="text-2xl mb-4 text-center text-color2">Vista Previa</h2>
        <div className="bg-white p-8 rounded shadow-lg" style={{ backgroundColor: colorFondo, color: colorTexto }}>
          <h2 className="text-2xl font-bold mb-2">{review}</h2>
          <p className="text-sm text-gray-500 mb-2">Publicado por: {usuario.nombre}</p>
          <p className="text-sm text-gray-500 mb-2">Fecha: Fecha Actual</p>
          {imagenPrevia && <img className="w-full h-64 object-cover mb-2 rounded" src={imagenPrevia} alt="Preview" />}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default EditPublicacion;