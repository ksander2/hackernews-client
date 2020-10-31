import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

export type AppAction = Action<string>;
export type AppThunkWithResult<TState, TResult> = ThunkAction<
  TResult,
  TState,
  null,
  AppAction
>;
export type AppThunk<TState> = AppThunkWithResult<TState, void>;
