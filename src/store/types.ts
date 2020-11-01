import rootReducer from './rootReducer';
import { AppThunkWithResult as ThunkWithResult } from '../types/store';

export type State = ReturnType<typeof rootReducer>;
export type AppThunkWithResult<TResult> = ThunkWithResult<State, TResult>;
export type AppThunk = AppThunkWithResult<void>;

export type LoadStage = 'none' | 'requested' | 'succeeded' | 'failed';
export type RequestInfo = {
  loadStage: LoadStage;
};
