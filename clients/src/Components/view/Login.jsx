import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import conexia from '../../img/conexia.png';
import { NavLink } from 'react-router-dom';
import { userLogin,googleAuth} from '../Redux/slice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { traerPublicaciones } from '../Redux/slicePublicaciones';

const Login = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.usuario)
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

 

   useEffect(() => {
      if(usuario.error){
          console.log(usuario.error);
          toast.error('Usuario no encontrado');
      }else  if(usuario.user) {
         console.log('todo correcto');
         toast.success('inicio de sesion exitoso')
          setTimeout ( () => { 
            navigate('/profile')
          },4000);
      }
   },[usuario]);

  const validarError = ({ email, password }) => {
    let respuesta = '';
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (email === '' && password === '') {
      respuesta = 'los campos no pueden estar vacíos';
    } else if (email === '' && password !== '') {
      respuesta = 'complete el campo de email';
    } else if (email !== '' && password === '') {
      respuesta = 'complete el campo de password';
    } else if (email !== '' && password !== '' && !passwordRegex.test(password)) {
      respuesta = 'la contraseña debe contener al menos un número y un carácter especial';
    }
    return respuesta;
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    const validar = validarError({ email, password });

    
    if (validar) {
      toast.error(validar);
    } else {
      await dispath(userLogin({ email, password }));
       dispath(traerPublicaciones());
    }

  }

  const handleLoginGoogle = () => {
      window.location.href = 'http://localhost:3007/auth/logGoogle';
      dispath(googleAuth());
      dispath(traerPublicaciones());
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2">
        <img src={conexia} alt="Background" className="object-cover w-full h-full" />
      </div>
      <div className="w-1/2 flex items-center justify-center p-8 bg-color1">
        <form className="w-64" onSubmit={handleSubmit}>
          <h2 className="mb-6 text-3xl text-center text-color2">Iniciar sesión</h2>
          <input type="email" placeholder="Email" value={email} className="w-full p-2 mb-4 border border-color3 rounded bg-color4 text-color5" onChange={(e) => setEmail(e.target.value)} />
          <div className="relative">
            <input type={passwordShown ? "text" : "password"} placeholder="Password" value={password} className="w-full p-2 mb-4 border border-color3 rounded bg-color4 text-color5" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={togglePasswordVisiblity} type="button" className="absolute right-2 top-2">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
          <button type="submit" className="w-full p-2 mb-4 bg-color6 text-color7 hover:text-color2 rounded">Ingresar</button>
          <button type="button" onClick={handleLoginGoogle} className="flex items-center justify-center w-full p-2 bg-color8 border border-color9 rounded">
            <img className="w-6 h-6 mr-2" src='https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA' alt='img' />
            Continuar con Google
          </button>
          <NavLink to='/register' className="w-full text-center text-blue-500 hover:underline">No tienes cuenta? Regístrate</NavLink>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
 
}

export default Login;


