import path from 'path';
import globby from 'globby';
import { getProjectArtifactId } from 'yoshi-helpers/build/utils';

export type ComponentModel = {
  componentId: string;
  componentPath: string;
};
export type PageModel = {
  route: string;
} & ComponentModel;
export type MethodModel = {
  methodId: string;
  methodPath: string;
};

export type FlowBMModel = {
  moduleId: string;
  pages: Array<PageModel>;
  components: Array<ComponentModel>;
  methods: Array<MethodModel>;
  moduleInitPath?: string;
  localePath: string;
  moduleConfig: any;
};

const exts = '{js,jsx,ts,tsx}';
const pagesPattern = `pages/**/*.${exts}`;
const componentsPattern = `components/**/*.${exts}`;
const methodsPattern = `methods/**/*.${exts}`;
const moduleInitPattern = `moduleInit.${exts}`;
const translationsPattern = 'translations';

export default function createFlowBMModel(cwd = process.cwd()): FlowBMModel {
  const globFiles = (pattern: string) =>
    globby.sync(pattern, { cwd, absolute: true, onlyFiles: true });

  const globDirs = (pattern: string) =>
    globby.sync(pattern, {
      cwd,
      absolute: true,
      onlyDirectories: true,
      expandDirectories: false,
    });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const moduleId = getProjectArtifactId(cwd)!;

  const pages = globFiles(pagesPattern).map(pagePath => ({
    componentId: `${moduleId}.pages.${path.parse(pagePath).name}`,
    componentPath: pagePath,
    route: '', // TODO: Deferred to the "render ERB" feature, unnecessary until then
  }));

  const components = globFiles(componentsPattern).map(componentPath => ({
    componentId: `${moduleId}.components.${path.parse(componentPath).name}`,
    componentPath,
  }));

  const methods = globFiles(methodsPattern).map(methodPath => ({
    methodId: `${moduleId}.methods.${path.parse(methodPath).name}`,
    methodPath,
  }));

  const [moduleInitPath] = globFiles(moduleInitPattern);
  const [localePath] = globDirs(translationsPattern);

  return {
    moduleId,
    pages,
    components,
    methods,
    localePath,
    moduleConfig: {},
    moduleInitPath,
  };
}
