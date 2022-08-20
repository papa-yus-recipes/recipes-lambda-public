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

type HasId = {
  id: string;
};

export type TagKey = string;

export type Tag = { name: TagKey } & {
  category: string;
};

export type TagItem = Item<Tag>;

export type RecipeKey = HasId["id"];

export type RecipeTags = Array<TagKey>;

type Ingredient = {
  main: string;
  substitutes?: Array<string>;
};

type Step = {
  step: string;
  elaboration?: string;
};

export type RecipeData = {
  name: string;
  description: string;
  time: number;
  servings: number;
  ingredients: Array<Ingredient>;
  steps: Array<Step>;
};

type BaseRecipe = { id: RecipeKey } & RecipeData;

type Recipe = BaseRecipe & { tags: RecipeTags };

export type RecipeItem = Item<Recipe>;
