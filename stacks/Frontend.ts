import { StackContext, NextjsSite } from "sst/constructs";

export function Frontend({ stack }: StackContext) {

  const site = new NextjsSite(stack, "Site", {
    path: "packages/frontend/",
  });

  // Add the site's URL to stack output (in console)
  stack.addOutputs({
    URL: site.url || "localhost:3000",
  });
}
