import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


//http://localhost:3007/user/login esta ruta es para que el usuario ingrese con su nombre y  contraseña y verifica si esta o no en la base de datos


export const userLogin = createAsyncThunk('usuario/login', async ({email,password}) => {
       const response = await  axios.post('http://localhost:3007/user/login',{email,password});
       console.log(response.data)
      return response.data;
})

export const googleAuth  = createAsyncThunk('auth/google', async () => {
       const userCookie = Cookies.get('user');
       if(userCookie){
          return JSON.parse(userCookie);
       }
       throw new Error('no user cookie found');
})

//createAsyncThunk solo espera un argumento
export const registerUser = createAsyncThunk('register/user', async ({nombre,email,password,imagen}) => {
          const formData  = new FormData();
          console.log("mi imagen ",imagen)
          formData.append('nombre',nombre);
          formData.append('email',email);
          formData.append('password',password);
          formData.append('imagen',imagen);
          const response  = await axios.post('http://localhost:3007/user/register' ,formData,{
             headers : {
                 'Content-Type' :'multipart/form-data'
             }
          })
       console.log('mi respuesta despues de haber registrado a un usuario',response);
        return response.data;
})


const usuario = createSlice({
    name : 'usuario',
    initialState : { user : null , status : 'idle', error : null},
    reducers :{},
    extraReducers : builder => {
          builder
          .addCase(userLogin.pending, (state) =>{
              state.status ='loading';
          })
          .addCase(userLogin.fulfilled , (state,action) => {
             state.status = 'succeeded';
             state.user = action.payload;
          })
          .addCase(userLogin.rejected,(state,action) => {
            state.status = 'failed';
            state.error = action.error;
          })
          .addCase(googleAuth.fulfilled, (state,action) => {
             state.user = action.payload;
          })
          .addCase(googleAuth.rejected, (state,action) => {
              state.error =action.error;
          })
          .addCase(registerUser.rejected,(state,action) =>{
              state.status = 'failed';
              state.error  = action;
          })
    }
})


export default usuario.reducer;