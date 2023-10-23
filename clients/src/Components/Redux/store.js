import { configureStore } from "@reduxjs/toolkit";
import  usuarioreducer from './slice.js';


export const store = configureStore ({
    reducer : {
      usuario  : usuarioreducer,
    }
})