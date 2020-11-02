import { RequestableState } from './types';

export function isLoading<TEntity>(state: RequestableState<TEntity>): boolean {
  return state.loadStage === 'requested';
}
