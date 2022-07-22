import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { sessionReducer } from "./auth";
import { bookApi } from "./api/bookAPI";
import { localeReducer } from "./locale";

const authConfig = {
  key: "bookReader/token",
  storage,
  blacklist: ["isAuth"],
};
const localePersistConfig = {
  key: "bookReader/locale",
  storage,
};

const persistedReducer = persistReducer(authConfig, sessionReducer);
const persistedLocaleReducer = persistReducer(
  localePersistConfig,
  localeReducer
);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    locale: persistedLocaleReducer,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    bookApi.middleware,
  ],
  devTools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);

const persistor = persistStore(store);

export { store, persistor };
