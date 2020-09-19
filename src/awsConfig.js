import AWS from "aws-sdk";

const config = {
  AWSKeys: {
    accessKeyId: "AKIAIJLT6WZSJN4NVPVA",
    secretAccessKey: "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",
    region: "us-east-2",
    bucket: "urbancrop-prod",
  },
};
export const AWSConfig = config["AWSKeys"];
AWS.config.update({
  accessKeyId: AWSConfig.accessKeyId,
  secretAccessKey: AWSConfig.secretAccessKey,
  region: AWSConfig.region,
});
export const s3 = new AWS.S3();
