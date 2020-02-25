declare module NodeJS {
  type Global = {
    yoshiPublishDir: string;
    teardown: () => void;
  };
}
