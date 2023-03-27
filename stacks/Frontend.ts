import { StackContext, NextjsSite, use } from 'sst/constructs';
import { API } from './API';

export function Frontend({ stack, app }: StackContext) {
  const { api } = use(API);
  const site = new NextjsSite(stack, "Site", {
    path: "packages/sst-frontend-nextjs",
    environment: {
      NEXT_PUBLIC_API_HOST: api.url,
    }
  });

  // Add the site's URL to stack output (in console)
  stack.addOutputs({
    URL: site.url || "localhost:3000",
  });
}
