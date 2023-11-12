import type {
  DeleteObjectCommandInput,
  GetObjectCommandInput,
  HeadObjectCommandInput,
  ListObjectsV2CommandInput,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import * as s3Client from '@aws-sdk/client-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as P from '@konker.dev/effect-ts-prelude';
import { mockClient } from 'aws-sdk-client-mock';

import * as unit from './index';
import { S3ClientDeps } from './index';

const s3Mock = mockClient(s3Client.S3Client);

describe('aws-client-effect-s3', () => {
  // eslint-disable-next-line fp/no-let
  let deps: unit.S3ClientDeps;

  beforeAll(() => {
    // eslint-disable-next-line fp/no-mutation
    deps = unit.S3ClientDeps.of({
      s3Client: new s3Client.S3Client({}),
    });
  });
  beforeEach(() => {
    s3Mock.reset();
  });

  // ------------------------------------------------------------------------
  describe('defaultS3ClientFactory', () => {
    it('should work as expected', async () => {
      expect(unit.defaultS3ClientFactory({})).toBeInstanceOf(S3Client);
    });
  });

  // ------------------------------------------------------------------------
  describe('GetObjectCommand', () => {
    it('should work as expected', async () => {
      s3Mock.on(s3Client.GetObjectCommand).resolves({ Body: 'Hello, World!' } as any);

      const params: GetObjectCommandInput = { Bucket: 'test-bucket', Key: 'test-key' };
      const command = P.pipe(unit.GetObjectCommandEffect(params), P.Effect.provideService(S3ClientDeps, deps));
      const actual = await P.Effect.runPromise(command);
      const expected = { Body: 'Hello, World!', _Params: params };
      expect(actual).toStrictEqual(expected);
      expect(s3Mock.calls().length).toEqual(1);
    });
  });

  // ------------------------------------------------------------------------
  describe('PutObjectCommand', () => {
    it('should work as expected', async () => {
      s3Mock.on(s3Client.PutObjectCommand).resolves({} as any);

      const params: PutObjectCommandInput = { Bucket: 'test-bucket', Key: 'test-key', Body: 'test-body' };
      const command = P.pipe(unit.PutObjectCommandEffect(params), P.Effect.provideService(S3ClientDeps, deps));
      const actual = await P.Effect.runPromise(command);
      const expected = { _Params: params };
      expect(actual).toStrictEqual(expected);
      expect(s3Mock.calls().length).toEqual(1);
    });
  });

  // ------------------------------------------------------------------------
  describe('HeadObjectCommand', () => {
    it('should work as expected', async () => {
      s3Mock.on(s3Client.HeadObjectCommand).resolves({ Body: 'Hello, World!' } as any);

      const params: HeadObjectCommandInput = { Bucket: 'test-bucket', Key: 'test-key' };
      const command = P.pipe(unit.HeadObjectCommandEffect(params), P.Effect.provideService(S3ClientDeps, deps));
      const actual = await P.Effect.runPromise(command);
      const expected = { Body: 'Hello, World!', _Params: params };
      expect(actual).toStrictEqual(expected);
      expect(s3Mock.calls().length).toEqual(1);
    });
  });

  // ------------------------------------------------------------------------
  describe('DeleteObjectCommand', () => {
    it('should work as expected', async () => {
      s3Mock.on(s3Client.DeleteObjectCommand).resolves({} as any);

      const params: DeleteObjectCommandInput = { Bucket: 'test-bucket', Key: 'test-key' };
      const command = P.pipe(unit.DeleteObjectCommandEffect(params), P.Effect.provideService(S3ClientDeps, deps));
      const actual = await P.Effect.runPromise(command);
      const expected = { _Params: params };
      expect(actual).toStrictEqual(expected);
      expect(s3Mock.calls().length).toEqual(1);
    });
  });

  // ------------------------------------------------------------------------
  describe('ListObjectsV2Command', () => {
    it('should work as expected', async () => {
      s3Mock.on(s3Client.ListObjectsV2Command).resolves({ Contents: [] });

      const params: ListObjectsV2CommandInput = { Bucket: 'test-bucket' };
      const command = P.pipe(unit.ListObjectsV2CommandEffect(params), P.Effect.provideService(S3ClientDeps, deps));
      const actual = await P.Effect.runPromise(command);
      const expected = { Contents: [], _Params: params };
      expect(actual).toStrictEqual(expected);
      expect(s3Mock.calls().length).toEqual(1);
    });
  });
});
