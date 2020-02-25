import {
  ModuleId,
  PageComponentId,
  TModuleParams,
} from '@wix/business-manager-api';

// Note: after submitting PR to BM you can replace the constant strings below
// Note: should be in sync with the config inside your BM module ERB
export const MODULE_ID = /* ModuleId.{%ProjectName%}*/ '{%PROJECT_NAME%}' as ModuleId;
export const COMPONENT_NAME = /* PageComponentId.{%ProjectName%}*/ '{%projectName%}' as PageComponentId;

export type IERBConfig = {
  topology: {
    staticsUrl: string;
  };
};

export type IBMModuleParams = {
  locale: string;
  config: IERBConfig;
} & TModuleParams;
