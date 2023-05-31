import { SSTConfig } from "sst";
import { API } from "./stacks/API";
import { Frontend } from "./stacks/Frontend";
import { Email } from "./stacks/Email";
import { Secrets } from "./stacks/Secrets";

export default {
  config(_input) {
    return {
      name: "sst-org-app",
      region: "ap-south-1",
    };
  },
  stacks(app) {
    app.stack(API).stack(Frontend);
  },
} satisfies SSTConfig;
