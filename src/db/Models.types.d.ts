import type { ModelType } from "dynamoose/dist/General";
import type { Item } from "dynamoose/dist/Item";
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
  | ModelType<Item>;

export type AttributeDefinition = Exclude<SchemaDefinition[string], AttributeType | any[]>;

type Item<T> = T & Item;

interface HasId {
  id: string;
}

export interface ITag {
  name: string;
  category: string;
}

export type TagItem = Item<ITag>;

type ITagReference = ITag["name"];

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

export type RecipeItem = Item<IRecipe>;
