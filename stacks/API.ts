import { StackContext, Api, Function } from "sst/constructs";

const envVariables = {
  DATABASE_URL: String(process.env.DATABASE_URL)
};

export function API({ stack }: StackContext) {
  new Function(stack, "SeedFunction", {
    environment: envVariables,
    handler: "packages/functions/src/seedUsers.handler",
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: envVariables,
      },
    },
    routes: {
      "POST /users": "packages/functions/src/insertUser.handler",
      "GET /users": "packages/functions/src/getUsers.handler",
    },
  });

  api.setCors({
    allowOrigins: ['*']
  })

  // Add the function's URL (API endpoint) to stack output (in console)
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api
  }
}
