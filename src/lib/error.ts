export const TAG = 'S3Error';

export type S3Error = {
  readonly _tag: typeof TAG;
  readonly _Params: unknown;
  readonly message: string;
  readonly cause: unknown;
};

export const toS3Error =
  <I>(params: I) =>
  (x: unknown): S3Error => {
    return {
      _tag: TAG,
      _Params: params,
      message: typeof x === 'object' && x && 'message' in x ? (x as any).message : String(x),
      cause: x,
    };
  };
