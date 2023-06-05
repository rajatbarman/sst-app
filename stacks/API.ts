import { StackContext, use, Api, Function } from 'sst/constructs';

const envVariables = {
  DATABASE_URL: String(process.env.DATABASE_URL),
};

export function API({ stack }: StackContext) {
  new Function(stack, 'SeedFunction', {
    environment: envVariables,
    handler: 'packages/functions/src/seedUsers.handler',
  });

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        environment: envVariables,
      },
    },
    routes: {
      'GET /auth/send-otp': {
        function: {
          handler: 'packages/functions/src/auth/sendOTP.handler',
          permissions: ['ses'],
        },
      },
      'GET /auth/verify-otp': {
        function: {
          handler: 'packages/functions/src/auth/verifyOTP.handler',
          environment: {
            ...envVariables,
            JWT_SIGNATURE: String(process.env.JWT_SIGNATURE),
          },
        },
      },
      'GET /auth/get-session': {
        function: {
          handler: 'packages/functions/src/auth/getSession.handler',
          environment: {
            ...envVariables,
            JWT_SIGNATURE: String(process.env.JWT_SIGNATURE),
          },
        },
      },
      'GET /auth/create-token': {
        function: {
          handler: 'packages/functions/src/auth/createToken.handler',
          environment: {
            ...envVariables,
            JWT_SIGNATURE: String(process.env.JWT_SIGNATURE),
          },
        },
      },
      'POST /users': 'packages/functions/src/users/insertUser.handler',
      'GET /users': 'packages/functions/src/users/getUsers.handler',
      'GET /buckets': {
        function: {
          handler: 'packages/functions/src/getBuckets.handler',
          permissions: ['s3'],
        },
      },
      'GET /upload-url': {
        function: {
          handler: 'packages/functions/src/getUploadUrl.handler',
          permissions: ['s3'],
        },
      },
    },
  });

  api.setCors({
    allowOrigins: ['*'],
  });

  // Add the function's URL (API endpoint) to stack output (in console)
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
