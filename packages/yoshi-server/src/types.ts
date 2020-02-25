import { Request, Response } from 'express';
import { JsonValue } from 'type-fest';
import { BootstrapContext } from '@wix/wix-bootstrap-ng/typed';
import * as t from 'io-ts';

// io-ts' types
export const requestPayloadCodec = t.type({
  fileName: t.string,
  functionName: t.string,
  args: t.array(t.any),
});

export type RequestPayload = t.TypeOf<typeof requestPayloadCodec>;

// General stuff
export type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
export type OptionalPromise<T> = T | Promise<T>;
export type FunctionArgs = Array<JsonValue>;
export type FunctionResult = OptionalPromise<JsonValue | void | undefined>;

// Server function types
export interface FunctionContext {
  req: Request;
  res: Response;
  context: any;
}

export type ServerFunction<
  Result extends FunctionResult,
  Args extends FunctionArgs
> = (this: FunctionContext, ...args: Args) => Result;

export interface DSL<Result extends FunctionResult, Args extends FunctionArgs> {
  fileName: string;
  functionName: string;
  __fn__: ServerFunction<Result, Args>;
}

// Route function types
export interface RouteContext {
  req: Request;
  res: Response;
  context: BootstrapContext;
  params: { [name: string]: any | undefined };
}

export type RouteFunction<Result extends FunctionResult> = (
  this: RouteContext,
) => Result;
