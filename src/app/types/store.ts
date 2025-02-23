import { useDispatch } from "react-redux";
import rootReducer from "../store/rootReducer";
import { store } from "../storeConfig";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
