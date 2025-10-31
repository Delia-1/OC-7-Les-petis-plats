import {getRecipes, indexData, countData }from "../utils/getRecipies.js";
import { displayMain } from "../templates/cardsTemplate.js";
import { displayAside, displayTagList, filtersFirstRender,  openFilter, selectAndUpdate,  setupIngredientFilter, bindTagBar } from "../templates/filterTemplate.js";
import { displayHeader, handleSearchInput } from "../templates/headerTemplate.js";
import { getRightRecipes} from "../templates/headerTemplate.js";

const recipeData = getRecipes()
const body = document.querySelector("body")
const index = indexData()
body.appendChild(displayHeader())
handleSearchInput()

filtersFirstRender(recipeData)
const asideEl = displayAside()
body.appendChild(asideEl)

const tagListEl = displayTagList();
asideEl.after(tagListEl);


openFilter()
setupIngredientFilter(recipeData, index)
selectAndUpdate(recipeData, index)
bindTagBar(index);

getRightRecipes(recipeData, index)

body.appendChild(displayMain(recipeData))
countData(recipeData)

// baseline initiale = toutes les recettes (aucune recherche / aucun tag)
import { setTagBaseline } from "../templates/filterTemplate.js";
setTagBaseline(recipeData);
