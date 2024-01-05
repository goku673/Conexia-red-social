import axios from 'axios';
import React, { useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { updateUser } from '../Redux/slice';
import { resetStatusUpdate } from '../Redux/slice';
import { traerPublicaciones } from '../Redux/slicePublicaciones';

const EditProfile = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario.user);
  const { statusUpdate  } = useSelector((state) => state.usuario);
  const [nombre, setNombre] = useState('');
  const [resenia, setResenia] = useState('');
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [imagenPortada, setImagenPortada] = useState(null);

  useEffect(() => {
    if (statusUpdate  === 'loading') {
       // eliminamos un toas antes de mostrar uno nuevo 
      toast.loading('Realizando Cambios');
    } else if (statusUpdate === 'succeeded') {
      toast.dismiss(); 
      toast.success('Cambios realizados con éxito!!');
      setNombre('');
      setResenia('');
      setImagenPerfil(null);
      setImagenPortada(null);
      // restablecemos despues mi estado  de succeeded a idle despues de una actualizacion exitosa 
      dispatch(resetStatusUpdate());
      dispatch(traerPublicaciones());
    } else if (statusUpdate  === 'failed') {
      toast.error('Hubo un error al realizar los cambios');
    }
  }, [statusUpdate,dispatch]);

  const handleResenia = (e) => {
    const wordCount = e.target.value.length;
  
    if (wordCount <= 300) {
      setResenia(e.target.value);
    } else {
      toast.error("Tu reseña  no puede contener más de 300 caracteres");
    }
  }

const onSubmitEvent = (e) => {
  e.preventDefault();
  console.log({ nombre, resenia, imagenPerfil, imagenPortada });

  if (!nombre && !resenia && !imagenPerfil && !imagenPortada) {
    toast.warning("No puede enviar campos vacios!!");
  } else if (!imagenPerfil || !imagenPortada) {
    toast.warning("Ambas imágenes son requeridas!!");
  } else {
    const formData = new FormData();
    formData.append('nombre', nombre || usuario.nombre);
    formData.append('resenia', resenia || usuario.resenia);
    formData.append('imagenPerfil', imagenPerfil);
    formData.append('imagenPortada', imagenPortada);
    console.log(formData)
    dispatch(updateUser(formData));
  }
}

  return (
    <div className="bg-color1 py-8 px-4">

      <h1 className="text-3xl font-semibold text-color4 mb-4">Edición de Perfil</h1>
          <p className='text-center text-color2' >Si no desea editar el nombre  y la reseña puede dejarlos en blanco</p>
      <form onSubmit={onSubmitEvent} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="text-xl font-semibold text-color4">Editar Nombre</label>
          <input type="text" placeholder="Editar nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full rounded-lg border border-color3 py-2 px-4 mt-2" />
        </div>

        <div className="mb-4">
          <label className="text-xl font-semibold text-color4">Editar Reseña</label>
          <textarea type="text" placeholder="Editar reseña" value={resenia} onChange={(e) => handleResenia(e)} className="w-full rounded-lg border border-color3 py-2 px-4 mt-2" />
          <span>{resenia.length}/300</span>
        </div>

        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-color4">Editar Foto de Perfil</h3>
          <input type="file" placeholder="Editar foto de perfil" onChange={(e) => setImagenPerfil(e.target.files[0])} className="mt-2" />
        </div>

        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-color4">Editar Foto de Portada</h3>
          <input type="file" placeholder="Editar foto de portada" onChange={(e) => setImagenPortada(e.target.files[0])} className="mt-2" />
        </div>

        <button type="submit" className="bg-color2 text-white font-semibold py-2 px-4 rounded-lg">
          Guardar Cambios
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditProfile;