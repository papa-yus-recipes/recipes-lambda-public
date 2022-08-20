import { S3 } from "aws-sdk";

import type { Controller, ResourcePath, Routes } from "./types";

import { createRecipe, deleteRecipe, updateRecipe } from "./db";

const s3 = new S3();
const BUCKET = <string>process.env["AWS_S3_BUCKET"];
const FILE_TYPE = <string>process.env["AWS_S3_FILE_TYPE"];

const s3Key = (id: string) => `${id}.${FILE_TYPE}`;

const uploadImage = (id: string, data_url: string) =>
  s3
    .putObject({
      Bucket: BUCKET,
      Key: s3Key(id),
      Body: Buffer.from(data_url.replace(/^data:image\/\w+;base64,/, ""), "base64"),
      ContentType: `image/${FILE_TYPE}`
    })
    .promise();

const deleteImage = (id: string) => s3.deleteObject({ Bucket: BUCKET, Key: s3Key(id) }).promise();

const extractBody = (event: any) => JSON.parse(event.body);

const routes: Routes = {
  "POST /": async (event) => {
    const { image, ...body } = extractBody(event);
    const recipe = await createRecipe(body);
    await uploadImage(recipe.id, image);
    return { statusCode: 201, body: JSON.stringify(recipe.toJSON()) };
  },
  "PATCH /": async (event) => {
    const { id, ...body } = extractBody(event);
    if (body.image) {
      const image = body.image;
      delete body.image;
      await uploadImage(id, image);
    }
    if (Object.keys(body).length) await updateRecipe(id, body);
    return { statusCode: 205, body: "Reset Content" };
  },
  "DELETE /": async (event) => {
    const key = extractBody(event);
    await deleteRecipe(key);
    await deleteImage(key.id);
    return { statusCode: 204, body: "No Content" };
  }
};

export const handler: Controller = async (event, context) => {
  const controller =
    routes[`${event.requestContext.httpMethod} ${<ResourcePath>event.requestContext.resourcePath}`];
  if (!controller) return { statusCode: 404, body: "Not Found" };
  return controller(event, context).catch((e) => {
    console.error(e);
    return { statusCode: 500, body: e.message };
  });
};
