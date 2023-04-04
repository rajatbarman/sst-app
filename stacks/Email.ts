import { StackContext, Function } from "sst/constructs";
export function Email({ stack }: StackContext) {
  const fn = new Function(stack, "SendEmail", {
    handler: "packages/functions/src/sendEmail.handler",
  });

  fn.attachPermissions(["ses"])
}
