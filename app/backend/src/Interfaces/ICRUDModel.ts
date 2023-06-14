import { ID } from '.';

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById?(id: ID): Promise<T | null>,
}

export type ICRUDModel<T> = ICRUDModelReader<T>;
