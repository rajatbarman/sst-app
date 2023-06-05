import { Bucket, StackContext } from 'sst/constructs';

export function Buckets({ stack }: StackContext) {
  const bucket1 = new Bucket(stack, 'public');
  const bucket2 = new Bucket(stack, 'private');

  const s3Buckets = {
    Bucket1: bucket1.bucketName,
    Bucket2: bucket2.bucketName,
  };

  stack.addOutputs(s3Buckets);
}
