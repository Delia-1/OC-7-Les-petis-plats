import recipes from "../../data/recipes.js"

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
  const cleaned = normalize(t.replace(/[.,;:!?()'’"«»-]/g, " "));
  cleaned
    .split(/\s+/)
    .filter((w) => w.length >= 3)
    .forEach((w) => textTokens.add(w));
};

export const indexData = (data = getRecipes()) => {
  let index = {
    text: {},
    filters: {},
  };
  data.forEach((recipe) => {
    let textTokens = new Set();

    formatTokens(recipe.description, textTokens);
    formatTokens(recipe.name, textTokens);

    recipe.ingredients.forEach((part) => {
      formatTokens(part.ingredient, textTokens);

      const fullIng = normalize(part.ingredient);
      if (!index.filters[fullIng]) index.filters[fullIng] = [];
      index.filters[fullIng].push(recipe.id);
    });

    if (recipe.appliance) {
      const appKey = normalize(recipe.appliance);
      if (!index.filters[appKey]) index.filters[appKey] = [];
      index.filters[appKey].push(recipe.id);
    }

    if (recipe.ustensils) {
      recipe.ustensils.forEach((ust) => {
        const ustKey = normalize(ust);
        if (!index.filters[ustKey]) index.filters[ustKey] = [];
        index.filters[ustKey].push(recipe.id);
      });
    }
    textTokens.forEach((token) => {
      if (!index.text[token]) index.text[token] = [];
      index.text[token].push(recipe.id);
    });
  });
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
}

export const loadIndexFromCache = () => {
  const data = localStorage.getItem("recipeIndex");
  return data ? JSON.parse(data) : null;
}


export default getRecipes;
