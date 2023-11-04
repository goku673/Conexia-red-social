import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify';

const EditProfile = () => {
  const usuario = useSelector((state) => state.usuario.user);
  const [nombre, setNombre] = useState('');
  const [resenia, setResenia] = useState('');
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [imagenPortada, setImagenPortada] = useState(null);

  const handleResenia = (e) => {
      const wordCount = e.target.value.length;
     ///  para la cantidad de palabras const filteredWordCount =   wordCount.filter(  function(n){ return n != '' }).length; 
       if( wordCount <= 100){
             setResenia(e.target.value);
       }else {
           toast.error("Tu reseña  no puede contener más de 100 caracteres");
       }
  }

  const onSubmitEvent = async (e) => {
    e.preventDefault();
    console.log({ nombre, resenia, imagenPerfil, imagenPortada });
    const formData = new FormData();
    formData.append('nombre',nombre);
    formData.append('resenia',resenia);
    formData.append('imagenPerfil',imagenPerfil);
    formData.append('imagenPortada',imagenPortada);

    try {
      
      const response = await axios.put(`http://localhost:3007/user/updateUser/${usuario.userID}`, formData);
  
      // Verificar si la solicitud fue exitosa
      console.log('Usuario actualizado exitosamente:', response.data);
    } catch (error) {
      console.error('Error al actualizar usuario:', error.response.statusText);
    }
  }
  

  return (
    <div className="bg-color1 py-8 px-4">

      <h1 className="text-3xl font-semibold text-color4 mb-4">Edición de Perfil</h1>
      <form onSubmit={onSubmitEvent} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="text-xl font-semibold text-color4">Editar Nombre</label>
          <input type="text" placeholder="Editar nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full rounded-lg border border-color3 py-2 px-4 mt-2" />
        </div>

        <div className="mb-4">
          <label className="text-xl font-semibold text-color4">Editar Reseña</label>
          <textarea type="text" placeholder="Editar reseña" value={resenia} onChange={(e) => handleResenia(e)} className="w-full rounded-lg border border-color3 py-2 px-4 mt-2" />
          <span>{resenia.length}/100</span>
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
        <ToastContainer/>
    </div> 
  );
}

export default EditProfile;