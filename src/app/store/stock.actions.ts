import { Action } from '@ngrx/store'

// 2 - Definición del tipo de acción
export const SET_STOCK = 'Set Stock';

// 3 - Creación de la clase tipo AddTask
export class SetStock implements Action {
  readonly type = SET_STOCK;
  constructor(public payload: string) { }
}

// 4 - Exportación de la acción
export type Actions = SetStock;