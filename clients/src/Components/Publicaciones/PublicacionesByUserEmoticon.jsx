import React from 'react'
import { changeUsuarioConPublicacionesModal } from '../Redux/slice';
import { useDispatch , useSelector} from 'react-redux';

 // este componte es de es para mostrar la informacion que de las  personas que dieron like a la  publicacion y de ahi para mostrar la informacion

 const PublicacionesByUserEmoticon = () => {
       const dispath = useDispatch();
       const {userById} = useSelector( state => state.usuario);
       const {publicacionIdUser} = useSelector( state => state.publicacion);

       const handelClickRegresar = () => {
           dispath(changeUsuarioConPublicacionesModal(false));
       }

  return (
    <div className='bg-color1 p-4 rounded mt-4 ml-4 md:ml-0 mr-4 md:mr-0 shadow-lg'>
           <button onClick={ handelClickRegresar} >regresar</button>
           
           {/* {
            <div className='bg-color1 p-4 rounded-lg mt-4 ml-4 md:ml-0 mr-4 md:mr-0 shadow-lg'>
      <div className="relative w-full h-44">
        <img src={user?.imagenURLPortada} alt="Portada no disponible" className="w-full h-48 rounded-t-lg object-cover" />
        <img src={user?.imagenURL} alt="Profile" className="relative -top-20 w-32 h-32 mx-auto rounded-full border-4 border-color1" />
      </div>
      <h2 className="mt-16 mb-4 text-2xl font-bold text-center text-color5">{user?.nombre}</h2>
      <p className="px-6 mt-4 mb-8 text-center text-color3">{user?.resenia || "No hay reseña disponible"}</p>
      <p className="text-center text-xs text-color3">Fecha de registro: {new Date(user?.fechaRegistro).toLocaleDateString()}</p>
      <div>
        <h1 className='text-bold text-color2'>Publicaciones de {user?.nombre}</h1>
           } */}
    </div>
  )
}


export default PublicacionesByUserEmoticon;