import { createAPIResponse } from '@core/utils';
import AWS from 'aws-sdk';
import { randomUUID } from 'crypto';
import { useQueryParams } from 'sst/node/api';
import { ApiHandler } from 'sst/node/api';

const s3 = new AWS.S3();

export const handler = ApiHandler(async (event) => {
  const params = useQueryParams();
  const { bucket } = params;

  if (!bucket) {
    return {};
  }
  const uploadParams = {
    Bucket: bucket,
    Key: randomUUID(),
    Expires: 60,
  };
  try {
    const uploadURL = await s3.getSignedUrlPromise('putObject', uploadParams);
    return createAPIResponse({
      error: false,
      message: 'Success',
      data: { url: uploadURL },
    });
  } catch (error) {
    return createAPIResponse({
      error: true,
      statusCode: 500,
      message: String(error),
    });
  }
});
