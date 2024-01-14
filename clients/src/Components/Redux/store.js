// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import usuarioreducer from './slice.js';
import publicacionreducer from './slicePublicaciones.js';

const rootReducer = combineReducers({
  usuario: usuarioreducer,
  publicacion: publicacionreducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['publicacion'], // Solo persiste estos slices del estado
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);