import { randomUUID } from "crypto";
import dynamoose from "dynamoose";

import type { AttributeDefinition, AttributeType, RecipeDoc, TagDoc } from "./Models.types";

const required = (type: AttributeType): AttributeDefinition => ({
  type,
  required: true
});

const rangeKey: AttributeDefinition = {
  type: String,
  rangeKey: true
};

const isPositiveInt = (n: unknown) => Number.isInteger(n) && <number>n > 0;

const Tag = dynamoose.model<TagDoc>(
  "tag",
  new dynamoose.Schema({
    name: String,
    category: rangeKey
  }),
  { create: false }
);

export const Recipe = dynamoose.model<RecipeDoc>(
  "recipe",
  new dynamoose.Schema({
    id: {
      type: String,
      default: () => randomUUID(),
      forceDefault: true
    },
    name: rangeKey,
    description: required(String),
    tags: {
      ...required(Array),
      schema: [Tag]
    },
    time: {
      ...required(Number),
      validate: isPositiveInt
    },
    servings: {
      ...required(Number),
      validate: isPositiveInt
    },
    ingredients: {
      ...required(Array),
      schema: [
        {
          type: Object,
          schema: {
            main: String,
            substitutes: {
              type: Array,
              schema: [String]
            }
          }
        }
      ]
    },
    steps: {
      ...required(Array),
      schema: [
        {
          type: Object,
          schema: {
            step: String,
            elaboration: String
          }
        }
      ]
    }
  }),
  { create: false }
);
