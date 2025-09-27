import getRecipes from "../utils/getRecipies.js"
import { cardTemplate } from "../templates/cardsTemplate.js";

export const displayCards = async () => {
  const recipesContainer = document.querySelector("main");
  const data = await getRecipes()

  data.forEach(recipe => {
    const card = cardTemplate(recipe)
    recipesContainer.appendChild(card)
  });
  const card = cardTemplate(data)

  // const card = cardTemplate(data[0])

  recipesContainer.appendChild(card)

}


displayCards()
