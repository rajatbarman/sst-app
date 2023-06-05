import { createAPIResponse } from '@core/utils';
import AWS from 'aws-sdk';
import { ApiHandler } from 'sst/node/api';

const s3 = new AWS.S3();

export const handler = ApiHandler(async (event) => {
  try {
    const buckets = await s3.listBuckets().promise();
    return createAPIResponse({
      error: false,
      message: 'Success',
      data: buckets.Buckets,
    });
  } catch (error) {
    return createAPIResponse({
      error: true,
      message: String(error),
    });
  }
});
