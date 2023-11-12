export type S3Error = {
  readonly _tag: 'S3Error';
  readonly message: string;
  readonly _Params: unknown;
};

export const toS3Error =
  <I>(params: I) =>
  (x: unknown): S3Error => {
    const message = x instanceof Error ? x.message : String(x);
    return { _tag: 'S3Error', message, _Params: params };
  };
