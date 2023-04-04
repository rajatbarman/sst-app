import { StackContext, Config } from "sst/constructs";

export function Secrets({ stack }: StackContext) {
  const JWT_SIGNATURE = new Config.Secret(stack, "JWT_SIGNATURE");
  const DB_URL = new Config.Secret(stack, "DB_URL");

  return {JWT_SIGNATURE, DB_URL}
}
