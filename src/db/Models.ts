import { randomUUID } from "crypto";
import dynamoose from "dynamoose";

import type { AttributeDefinition, AttributeType, RecipeItem, TagItem } from "./Models.types";

const required = (type: AttributeType): AttributeDefinition => ({
  type,
  required: true
});

const isPositiveInt = (n: unknown) => Number.isInteger(n) && <number>n > 0;

const Tag = dynamoose.model<TagItem>("tag", {
  name: String,
  category: String
});

export const Recipe = dynamoose.model<RecipeItem>("recipe", {
  id: {
    type: String,
    default: () => randomUUID()
  },
  name: {
    ...required(String),
    index: {
      type: "global"
    }
  },
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
          main: required(String),
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
          step: required(String),
          elaboration: String
        }
      }
    ]
  }
});
