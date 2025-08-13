export const bucket = new sst.aws.Bucket("KensingSwordsDemo", {
  access: "public",
  principals: "*"
});
