import { IWixStatic } from '@wix/native-components-infra/dist/es/src/types/wix-sdk';

declare global {
  type Window = {
    Wix: IWixStatic;
  };
}
