import getRecipes from "../utils/getRecipies.js";
import { displayMain } from "../templates/cardsTemplate.js";
import { displayAside } from "../templates/filterTemplate.js";
import { displayFiltered, displayHeader } from "../templates/headerTemplate.js";
import { getRightRecipes, indexData } from "../templates/headerTemplate.js";

const recipeData = getRecipes()
const body = document.querySelector("body")


body.appendChild(displayHeader())
getRightRecipes(recipeData)

body.appendChild(displayAside())
body.appendChild(displayMain(recipeData))
