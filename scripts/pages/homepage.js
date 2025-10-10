import getRecipes from "../utils/getRecipies.js";
import { displayMain } from "../templates/cardsTemplate.js";
import { displayAside, filtersFirstRender } from "../templates/filterTemplate.js";
import {  displayHeader } from "../templates/headerTemplate.js";
import { getRightRecipes} from "../templates/headerTemplate.js";

const recipeData = getRecipes()
const body = document.querySelector("body")


body.appendChild(displayHeader())
getRightRecipes(recipeData)

body.appendChild(displayAside(recipeData))
// Faire en conditionné?
  filtersFirstRender(recipeData)


body.appendChild(displayMain(recipeData))
