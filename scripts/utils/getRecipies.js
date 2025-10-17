export const getRecipes = () => {
  const data = recipes
  // const ingredientsObj = data.forEach(recipe => {
  //   recipe.ingredients[0]
  // })
  return data
};


export function normalize(s) {
  const newS = s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
  return newS;
}




export const indexData = (data = getRecipes()) => {
  let index = {
    text: {},
    filters: {}
  }

  data.forEach((recipe) => {
    let textTokens = new Set();

    recipe.description
      .replace(/[.,;:!?()]/g, "")
      .split(/\s+/)
      .filter((w) => w.length >= 3)
      .forEach((w) => textTokens.add(w));

    recipe.name
      .split(/\s+/)
      .filter((w) => w.length >= 3)
      .forEach((w) => textTokens.add(w));

    recipe.ingredients.forEach((part) => {
      part.ingredient
        .replace(/[.,;:!?()]/g, "")
        .split(/\s+/)
        .filter((w) => w.length >= 3)
        .forEach((w) => textTokens.add(w));


      // Indexer l'expression complète de l'ingrédient
      const fullIng = normalize(part.ingredient);
      if (!index.filters[fullIng]) index.filters[fullIng] = [];
      index.filters[fullIng].push(recipe.id);
    });

 // Index appareil complet
    if (recipe.appliance) {
      const appKey = normalize(recipe.appliance);
      if (!index.filters[appKey]) index.filters[appKey] = [];
      index.filters[appKey].push(recipe.id);
    }

    // Index ustensiles complets
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

export function getRecipeIdsFromKeywords(keywords, index) {
  // keywords : array de mots normalisés
  // index : index inversé (mot → [ids])
  const lists = keywords
    .map(word => index[word])
    .filter(Boolean); // retire les mots non trouvés

  if (lists.length === 0) return [];
  // Intersection des ids
  return lists.reduce((acc, ids) => acc.filter(id => ids.includes(id)));
}


export default getRecipes
