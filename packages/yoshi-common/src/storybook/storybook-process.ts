import path from 'path';
import { EventEmitter } from 'events';
import waitPort from 'wait-port';
import createWebpackConfig from './storybook.webpack.config';

const storyBookConfigFolder = path.join(__dirname, '../..', '.storybook');

type StorybookProcessOptions = {
  port: number;
};

export default class StorybookProcess extends EventEmitter {
  port: number;

  constructor({ port }: StorybookProcessOptions) {
    super();
    this.port = port;
  }

  static create({ port = 9009 }: StorybookProcessOptions) {
    return new StorybookProcess({ port });
  }

  start = async () => {
    try {
      require.resolve('yoshi-storybook-dependencies/package.json');
    } catch (e) {
      throw new Error(
        'Please install yoshi-storybook-dependencies in order to run storybook',
      );
    }

    this.emit('compiling');

    // eslint-disable-next-line import/no-extraneous-dependencies
    const storybook = require(`@storybook/react/standalone`);

    const webpackConfig = createWebpackConfig({
      projectRoot: path.join(process.cwd(), 'src'),
      reporter: this.reporter,
    });

    storybook({
      mode: 'dev',
      webpackConfig,
      port: this.port,
      ci: true,
      quiet: false,
      configDir: storyBookConfigFolder,
    });

    await waitPort({
      port: +this.port,
      output: 'silent',
      timeout: 20000,
    });
    this.emit('listening', this.port);
  };

  reporter = (middlewareOptions: any, options: any) => {
    const { state, stats } = options;
    state
      ? this.emit('finished-log', { stats, port: this.port })
      : this.emit('compiling');
  };
}
