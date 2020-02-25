type Window = {
  __LOCALE__: string;
  __BASEURL__: string;
};

// tslint:disable-next-line:no-namespace
declare namespace Express {
  type Request = {
    aspects: any;
  };
}

declare module 'yoshi-template-intro';
