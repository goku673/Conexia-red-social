import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


//http://localhost:3007/user/login esta ruta es para que el usuario ingrese con su nombre y  contraseña y verifica si esta o no en la base de datos


export const userLogin = createAsyncThunk('usuario/login', async ({email,password}) => {
       const response = await  axios.post('http://localhost:3007/user/login',{email,password});
       console.log(response.data)
      return response.data;
})

export const googleAuth  = createAsyncThunk('auth/google',  () => {
       const userCookie = Cookies.get('user');
       const myUser =  JSON.parse(userCookie);
       if(myUser){
           return  myUser
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

// para aactualizar mi usuario  

export const  updateUser =  createAsyncThunk('usuario/update', async (userData, {getState}) => {
         const {userID} =getState().usuario.user;
         console.log(userID);
         const response = await axios.put(`http://localhost:3007/user/updateUser/${userID}`,userData)
         console.log(response.data);
         return response.data;
})


export const  searchUserByName =  createAsyncThunk ('get/userByName', async (nombre) => {
        const response = await axios.get(`http://localhost:3007/user/userName?nombre=${nombre}`);
         return response.data;
})

export const userById = createAsyncThunk ('getUser/ById',async (id) => {
    const response = await axios.get(`http://localhost:3007/user/userId/${id}`);
    return response.data;
})
const usuario = createSlice({
    name : 'usuario',
    initialState : { user : null , status : 'idle', error : null ,userRegister : null, statusUpdate : 'idle', usersByName :[] , statusUsers : 'idle',userByID : null},
    reducers :{
         resetStatusUpdate : (state) => {
              state.statusUpdate = 'idle';
         },
         clearUserByName  : (state) => {
             state.usersByName = []
         },
         resetStatusGetUsers : (state) => {
            state.statusUsers = 'idle';
         }
    },
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
          .addCase(registerUser.fulfilled, (state,action) => {
              state.status = 'succeeded';
              state.userRegister =action.payload;
          })
          .addCase(updateUser.fulfilled, (state,action) => {
             state.statusUpdate  = 'succeeded';
             state.user = action.payload;
          })
          .addCase(updateUser.pending, (state) => {
              state.statusUpdate = 'loading';
          })
          .addCase(updateUser.rejected , (state,action) => {
              state.statusUpdate   = 'failed';
              state.error = action.error.message
          })
          .addCase(searchUserByName.rejected, (state,action) => { 
                 state.statusUsers  = 'failed',
                 state.error = action.error;
                 state.usersByName = [];
          })
          .addCase(searchUserByName.pending, (state) => {
              state.statusUsers ='loading'
          })
          .addCase(searchUserByName.fulfilled, (state,action) => {
               state.statusUsers = 'succeeded';
               state.usersByName = action.payload;
          })
          .addCase(userById.fulfilled, (state,action) => {
             state.userByID = action.payload;
          })
    }
})

export const {resetStatusUpdate} = usuario.actions;
export const {clearUserByName}  =usuario.actions;
export const {resetStatusGetUsers} = usuario.actions;
export default usuario.reducer;