import path from 'path';
import fs from 'fs-extra';
import { STATICS_DIR } from 'yoshi-config/build/paths';
import renderVM from '../server/vm';
import { FlowEditorModel } from '../model';

const templatesPath = path.resolve(__dirname, '../server/templates');

const vmPaths = {
  editor: path.join(templatesPath, './editorApp.vm'),
  settings: path.join(templatesPath, './settingsApp.vm'),
};

const generateHTMLFromVM = (
  destinationDir: string,
  vmPath: string,
  { widgetName }: { widgetName: string },
) => {
  const rendered = renderVM(vmPath, {
    widgetName,
    clientTopology: {
      staticsBaseUrl: '../',
    },
  });
  fs.copyFileSync(vmPath, path.join(destinationDir, `${widgetName}.vm`));
  fs.writeFileSync(path.join(destinationDir, `${widgetName}.html`), rendered);
};

const getOutputFilename = (type: 'editor' | 'settings') => {
  return path.resolve(path.join(STATICS_DIR, type));
};

export const generateEditorHTMLFiles = (model: FlowEditorModel) => {
  fs.mkdirpSync(path.join(STATICS_DIR, 'editor'));
  fs.mkdirpSync(path.join(STATICS_DIR, 'settings'));
  model.components.forEach(component => {
    generateHTMLFromVM(getOutputFilename('editor'), vmPaths.editor, {
      widgetName: component.name,
    });
    generateHTMLFromVM(getOutputFilename('settings'), vmPaths.settings, {
      widgetName: component.name,
    });
  });
};

// Finish html generation
// Verify data is correct
// Copy vm files with html files
