import {getRecipes, indexData, countData }from "../utils/getRecipies.js";
import { displayMain } from "../templates/cardsTemplate.js";
import { displayAside, filtersFirstRender,  openFilter, selectAndUpdate,  setupIngredientFilter } from "../templates/filterTemplate.js";
import { displayHeader } from "../templates/headerTemplate.js";
import { getRightRecipes} from "../templates/headerTemplate.js";

const recipeData = getRecipes()
const body = document.querySelector("body")
const index = indexData()
body.appendChild(displayHeader())


filtersFirstRender(recipeData)
body.appendChild(displayAside())
openFilter()
selectAndUpdate(recipeData, index)
countData(recipeData)


setupIngredientFilter(recipeData, index)
getRightRecipes(recipeData, index)
body.appendChild(displayMain(recipeData))
