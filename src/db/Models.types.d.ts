import type { Document } from "dynamoose/dist/Document";
import type { ModelType } from "dynamoose/dist/General";
import type { Schema, SchemaDefinition } from "dynamoose/dist/Schema";

export type AttributeType =
  | string
  | StringConstructor
  | BooleanConstructor
  | NumberConstructor
  | BufferConstructor
  | DateConstructor
  | ObjectConstructor
  | ArrayConstructor
  | SetConstructor
  | symbol
  | Schema
  | ModelType<Document>;

export type AttributeDefinition = Exclude<SchemaDefinition[string], AttributeType | any[]>;

type Doc<T> = T & Document;

interface HasId {
  id: string;
}

export interface ITag {
  name: string;
  category: string;
}

export type TagDoc = Doc<ITag>;

type ITagReference = Pick<ITag, "name" | "category">;

interface IIngredient {
  main: string;
  substitutes?: Array<string>;
}

interface IStep {
  step: string;
  elaboration?: string;
}

export interface IRecipe extends HasId {
  name: string;
  description: string;
  tags: Array<ITagReference>;
  time: number;
  servings: number;
  ingredients: Array<IIngredient>;
  steps: Array<IStep>;
}

export type RecipeDoc = Doc<IRecipe>;
