import type { RecipeData, RecipeKey } from "./Models.types";

import { Recipe } from "./Models";

export const createRecipe = (recipe: RecipeData) => Recipe.create(recipe);

export const updateRecipe = (key: RecipeKey, update: Partial<RecipeData>) =>
  Recipe.update(key, update);

export const deleteRecipe = (key: RecipeKey) => Recipe.delete(key);
