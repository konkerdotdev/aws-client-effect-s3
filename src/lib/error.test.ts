import type { GetObjectCommandInput } from '@aws-sdk/client-s3';
import * as P from '@konker.dev/effect-ts-prelude';

import * as unit from './error';
import { TAG } from './error';

describe('error', () => {
  it('should work as expected with an Error instance input', () => {
    const error = new Error('BOOM!');
    const params: GetObjectCommandInput = { Bucket: 'test-bucket', Key: 'test-key' };
    const actual = P.pipe(error, unit.toS3Error(params));
    const expected = { message: 'BOOM!', cause: error, _tag: TAG, _Params: params };
    expect(actual).toStrictEqual(expected);
  });

  it('should work as expected with a non-Error input', () => {
    const error = 'BOOM!';
    const params: GetObjectCommandInput = { Bucket: 'test-bucket', Key: 'test-key' };
    const actual = P.pipe(error, unit.toS3Error(params));
    const expected = { message: 'BOOM!', cause: error, _tag: TAG, _Params: params };
    expect(actual).toStrictEqual(expected);
  });
});
