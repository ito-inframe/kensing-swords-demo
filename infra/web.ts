import { api } from "./api";
import { bucket } from "./storage";
//import { userPool, identityPool, userPoolClient } from "./auth";

const region = aws.getRegionOutput().name;

export const frontend = new sst.aws.StaticSite("Frontend", {
  path: "packages/frontend",
  build: {
    output: "dist",
    command: "npm run build",
  },
  environment: {
    VITE_REGION: region,
    VITE_API_URL: api.url,
    VITE_BUCKET: bucket.name,
  },
});
