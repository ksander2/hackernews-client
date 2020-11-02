import { EntityState } from '@reduxjs/toolkit';

export type RequestableState<TEntity> = EntityState<TEntity> & RequestInfo;
