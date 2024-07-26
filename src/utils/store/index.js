import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import authSlice from "./auth.slice";
import storage from "redux-persist/lib/storage";
import adminSlice from "./admin.slice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
};
const reducer = combineReducers({
    auth: authSlice,
    admin: adminSlice,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export const persistor = persistStore(store);
export default store;
