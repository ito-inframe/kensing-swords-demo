import { bucket } from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api");

api.route("GET /", {
  link: [bucket],
  handler: "packages/functions/src/api.handler",
});

api.route("GET /meters/{ym}", {
  link: [bucket],
  handler: "packages/functions/src/listmeters.main",
});

/*
export const myApi = new sst.aws.Function("MyApi", {
  url: true,
  link: [bucket],
  handler: "packages/functions/src/api.handler"
});
*/
