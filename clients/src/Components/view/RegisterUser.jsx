import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import conexia from '../../img/conexia.png';
import { registerUser } from '../Redux/slice';
import { useDispatch,useSelector} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

 const RegisterUser = () => {
    const usuario = useSelector((state) => state.usuario);
    console.log("mi slice usuario",usuario);
    const  dispath = useDispatch(); 
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imagen, setImagen] = useState(null);
    const [passwordShown, setPasswordShown] = useState(false);
  
    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };
        
    const handleImageChange = (e) => {
      console.log('mi event targe.files[0] es', e.target.files[0])
      setImagen(e.target.files[0]);
      
    };

    useEffect(() => {
      if (usuario.error) {
        toast.error('No se pudo registrar los datos');
      } else if (usuario.userRegister) {
        toast.success('Usuario registrado con éxito');
        setTimeout ( () => {
          navigate('/');
        },4000);
      
      }
    }, [usuario,navigate]);

    const validarErrores = (nombre, email, password, imagen) => {
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  
      if (!nombre) {
          return 'Nombre no puede estar vacío';
      }
  
      if (!email) {
          return 'Email no puede estar vacío';
      }
  
      if (!password) {
          return 'La contraseña no puede estar vacío';
      }
  
      if (!imagen) {
          return 'Debe cargar una imagen para registrarse';
      }
  
      if (!passwordRegex.test(password)) {
          return 'La contraseña debe tener al menos un número y un carácter especial';
      }
  
      return '';
  }

    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const validar   = validarErrores(nombre,email,password,imagen);

      if  (validar){
        toast.error(validar);
      }else {
         await dispath(registerUser({nombre,email,password,imagen}));
       
      }

 } 
    return (
      <div className="flex min-h-screen">
        <div className="w-1/2">
          <img src={conexia} alt="Background" className="object-cover w-full h-full" />
        </div>
        <div className="w-1/2 flex items-center justify-center p-8 bg-color1">
          <form className="w-64" onSubmit={handleSubmit}>
            <h2 className="mb-6 text-3xl text-center text-color2">Regístrate</h2>
            <input type="text" placeholder="Nombre" value={nombre} className="w-full p-2 mb-4 border border-color3 rounded bg-color4 text-color5" onChange={ (e) => setNombre(e.target.value)} />
            <input type="email" placeholder="Email" value={email} className="w-full p-2 mb-4 border border-color3 rounded bg-color4 text-color5" onChange={(e) => setEmail(e.target.value)}/>
            <div className="relative">
              <input type={passwordShown ? "text" : "password"} placeholder="Password" value={password} className="w-full p-2 mb-4 border border-color3 rounded bg-color4 text-color5" onChange={(e) =>setPassword(e.target.value) } />
              <button onClick={togglePasswordVisiblity} type="button" className="absolute right-2 top-2">
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
            <input type="file"   onChange={handleImageChange} className="w-full p-2 mb-4 border border-color3 rounded bg-color4 text-color5" />
            <button type="submit" className="w-full p-2 mb-4 bg-color6 text-color7 rounded">Registrarse</button>
          </form>
            <ToastContainer/>
        </div>
      </div>
    );
}
export default RegisterUser;