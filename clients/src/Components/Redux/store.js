import { configureStore } from "@reduxjs/toolkit";
import  usuarioreducer from './slice.js';
import publicacionreducer from './slicePublicaciones.js'

export const store = configureStore ({
    reducer : {
      usuario  : usuarioreducer,
      publicacion : publicacionreducer,

    }
})