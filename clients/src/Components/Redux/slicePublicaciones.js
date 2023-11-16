import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios  from "axios";

export const  traerPublicaciones = createAsyncThunk('get/allpublicaciones', async () => {
      const response = await axios.get('http://localhost:3007/post/all');
      return response.data;
})

export const publicar  =  createAsyncThunk('post/publicaciones', async ({review,colorFondo,colorTexto,imagen},{getState}) => {
    const formData = new FormData();
    const user_id = getState().usuario.user.userID;
    console.log( {review,user_id,colorFondo,colorTexto,imagen});
    formData.append('review',review);
    formData.append('user_id',user_id);
    formData.append('colorFondo',colorFondo);
    formData.append('colorTexto',colorTexto);
    formData.append('imagen',imagen);
    
    const response  = await axios.post('http://localhost:3007/post/create',formData);
    return   response.data;
         
})

export const comentar = createAsyncThunk('post/comentario', async ({comentario,idPublicacion},{getState}) => {
      const idUser  = getState().usuario.user.userID;
      const response  = await axios.post('http://localhost:3007/comentario/createComentario',{comentario,idPublicacion,idUser});
      return response.data;
})

export const darLikeODislike = createAsyncThunk('post/emoticon', async (idPublicacion,{getState}) => {
       const idUser = getState().usuario.user.userID;
       const response  = await axios.post('http://localhost:3007/emoticon/darLike',{idPublicacion,idUser})
       return response.data;
})

const publicacion = createSlice({
     name : 'publicacion',
     reducers : {
       resetStatusPublicar : (state)   => {
           state.statusPublicar  = 'idle';
       }
     },
     initialState : { publicaciones : [], status : 'idle', error : null,statusPublicar :'idle'},
     extraReducers : builder => {
        builder
        .addCase(traerPublicaciones.rejected, (state,action) => {
             state.status = 'failed',
             state.error  = action.error;
        })
        .addCase(traerPublicaciones.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.publicaciones = action.payload;
        })
        .addCase(traerPublicaciones.pending , (state ,action) => { 
            state.status  = 'loading';
            
        })
        .addCase(publicar.fulfilled, (state,action) => {
           state.statusPublicar ='succeeded';
           
        })
        .addCase(publicar.pending, (state) => {
          state.statusPublicar  = 'loading';
        })
        .addCase(publicar.rejected, (state) => {
          state.statusPublicar = 'failed';
          state.error  = action.payload;
        })
        

     }

});

export const {resetStatusPublicar} = publicacion.actions;
export default publicacion.reducer;