import type { IRecipe } from "./Models.types";

import { Recipe } from "./Models";

type RecipeKey = Pick<IRecipe, "id" | "name">;
type RecipeData = Omit<IRecipe, keyof RecipeKey>;

export const createRecipe = (recipe: RecipeData) => Recipe.create(recipe);

export const updateRecipe = (key: RecipeKey, update: Partial<RecipeData>) =>
  Recipe.update(key, update);

export const deleteRecipe = (key: RecipeKey) => Recipe.delete(key);
