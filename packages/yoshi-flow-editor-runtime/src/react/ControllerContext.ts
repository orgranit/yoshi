import { createContext } from 'react';

// TODO - props + state + methods of create controller return value
export type IControllerContext = {
  methods?: any;
  state?: any;
};

export const ControllerContext = createContext<IControllerContext>({});
