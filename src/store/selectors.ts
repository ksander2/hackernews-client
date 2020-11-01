import { EntityState } from '@reduxjs/toolkit';
import { RequestInfo } from './types';

type RequestableState<TEntity> = EntityState<TEntity> & RequestInfo;

export function isLoading<TEntity>(state: RequestableState<TEntity>): boolean {
  return state.loadStage === 'requested';
}
