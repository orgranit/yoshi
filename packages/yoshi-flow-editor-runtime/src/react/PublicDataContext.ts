import { createContext } from 'react';

export type IPublicDataContext = {
  ready: boolean;
  readyPromise?: Promise<boolean>;
  set?: (key: string, value: any) => void;
  // It actually returns PublicData | boolean | null | Promise<boolean>
  // We just don't have the PublicData type yet
  get?: (key: string) => any;
  type?: PublicDataType;
};

export type PublicDataType = 'viewer-public-data' | 'editor-public-data';

export type IPublicData = {
  set: (key: string, value: any) => void;
  get: (key: string) => any;
};

export const PublicDataContext = createContext<IPublicDataContext>({
  ready: false,
});
