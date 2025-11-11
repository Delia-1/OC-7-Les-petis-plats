import recipes from "../../data/recipes.js";

export const getRecipes = () => {
  const data = recipes;
  return data;
};

export const countData = (data = getRecipes()) => {
  const dataLength = data.length;
  const countText = document.querySelector(".count-text");
  if (countText) {
    countText.textContent = `${dataLength} recettes`;
  }
};

export function normalize(s) {
  const newS = s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
  return newS;
}

export const formatTokens = (t, textTokens) => {
  if (!t) return;
  const cleaned = normalize(t.replace(/[.,;:!?()'’"«»]/g, " "));
  const cleanedAndSplitted = cleaned.split(/\s+/);
  const uniqTokens = new Set();

  for (const word of cleanedAndSplitted) {
    if (word.length >= 3) {
      uniqTokens.add(word);
    }
  }
  for (const word of uniqTokens) {
    textTokens.add(word);
  }
};

export const indexData = (data = getRecipes()) => {
  let index = {
    text: {},
    filters: {},
  };

  for (let i = 0; i < data.length; i++) {
    const recipe = data[i];
    let textTokens = new Set();

    formatTokens(recipe.description, textTokens);
    formatTokens(recipe.name, textTokens);

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const part = recipe.ingredients[j];
      formatTokens(part.ingredient, textTokens);
      const fullIng = normalize(part.ingredient);
      if (!index.filters[fullIng]) index.filters[fullIng] = [];
      index.filters[fullIng].push(recipe.id);
    }

    if (recipe.appliance) {
      const appKey = normalize(recipe.appliance);
      if (!index.filters[appKey]) index.filters[appKey] = [];
      index.filters[appKey].push(recipe.id);
    }

    if (recipe.ustensils) {
      for (let k = 0; k < recipe.ustensils.length; k++) {
        const ustKey = normalize(recipe.ustensils[k]);
        if (!index.filters[ustKey]) index.filters[ustKey] = [];
        index.filters[ustKey].push(recipe.id);
      }
    }

    for (const token of textTokens) {
      if (!index.text[token]) index.text[token] = [];
      index.text[token].push(recipe.id);
    }
  }
  return index;
};

export function getRecipeIdsFromKeywords(keywords, dict) {
  if (!Array.isArray(keywords) || !dict) return [];
  const lists = keywords
    .map((word) => dict[word] || [])
    .filter((arr) => Array.isArray(arr) && arr.length > 0);

  if (lists.length === 0) return [];
  return lists.reduce((acc, ids) => acc.filter((id) => ids.includes(id)));
}

export const saveIndexToCache = (index) => {
  localStorage.setItem("recipeIndex", JSON.stringify(index));
};

export const loadIndexFromCache = () => {
  const data = localStorage.getItem("recipeIndex");
  return data ? JSON.parse(data) : null;
};

export default getRecipes;
