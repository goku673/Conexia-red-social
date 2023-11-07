import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios  from "axios";

export const  traerPublicaciones = createAsyncThunk('get/allpublicaciones', async () => {
      const response = await axios.get('http://localhost:3007/post/all');
      return response.data;
})


const publicacion = createSlice({
     name : 'publicacion',
     reducers : {},
     initialState : { publicaciones : [], status : 'idle', error : null},
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

     }

});


export default publicacion.reducer;