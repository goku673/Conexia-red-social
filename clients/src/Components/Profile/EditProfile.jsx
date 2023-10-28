import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { updateUserProfile } from './userSlice';

const EditProfile = () => {
//   const user = useSelector((state) => state.user);
//   const [name, setName] = useState(user.name);
//   const [imageUrl, setImageUrl] = useState(user.imageUrl);
//   const [coverImageUrl, setCoverImageUrl] = useState(user.coverImageUrl);
//   const [bio, setBio] = useState(user.bio);
//   const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(updateUserProfile({ name, imageUrl, coverImageUrl, bio }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-color1 py-2 sm:px-6 lg:px-8">
      <div className="px-8 py-6 mt-8 text-left bg-color4 shadow-md sm:rounded-lg">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-color2">Nombre</label>
            <input type="text"  className="mt-1 block w-full rounded-md border-color5 shadow-sm focus:border-color19 focus:ring focus:ring-color19 focus:ring-opacity-50" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-color2">URL de la imagen del perfil</label>
            <input type="text"  className="mt-1 block w-full rounded-md border-color5 shadow-sm focus:border-color19 focus:ring focus:ring-color19 focus:ring-opacity-50" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-color2">URL de la imagen de portada</label>
            <input type="text"  className="mt-1 block w-full rounded-md border-color5 shadow-sm focus:border-color19 focus:ring focus:ring-color19 focus:ring-opacity-50" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-color2">Reseña</label>
            <textarea className="mt-1 block w-full rounded-md border-color5 shadow-sm focus:border-color19 focus:ring focus:ring-color19 focus:ring-opacity-50" />
          </div>
          <div className="mt-4">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-color19 hover:bg-color12 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color19">
              Actualizar perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default EditProfile;