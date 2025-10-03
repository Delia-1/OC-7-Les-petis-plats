import getRecipes from "../utils/getRecipies.js"
import { cardTemplate } from "../templates/cardsTemplate.js";
import { filterSectionTemplate } from "../templates/filterTemplate.js";

export const displayCards = async () => {
  const recipesContainer = document.querySelector("main");
  const data = await getRecipes()

    data.forEach(recipe => {
    const card = cardTemplate(recipe)
    recipesContainer.appendChild(card)
  });
openFilter()
}


const filtersObj = [
    {"id": "Ingrédients",
      "items": ["coco", "lait"]},
    {"id": "Appareils",
      "items": ["four", "BBQ"]},
    {"id": "Ustensiles",
      "items" : ["fourchette", "fouet"]}
]

export const displayFilters = () => {
  const asideContainer = document.querySelector(".search-aside")
  asideContainer.innerHTML = ""

  filtersObj.forEach((item) => {
    const currentNode = filterSectionTemplate(item);
    const filterName = currentNode.querySelector(".filterName")

    currentNode.dataset.key = item.id;
    filterName.textContent = item.id;

  asideContainer.appendChild(currentNode)

  const list = currentNode.querySelector(".item-list");
  item.items.forEach((item) => {
    const li = document.createElement("li")
    li.textContent = item
    list.appendChild(li)
  })
})
}

displayCards()
displayFilters()




export const openFilter = () => {
  // Le conteneur  tpl
  const asideContainer = document.querySelector(".search-aside")

  asideContainer.addEventListener("click", (e) => {
    const header = e.target.closest(".filter-header");

    const root = header.closest(".div-filter");
   const content = root.querySelector(".div-filter--content")
   const dropdown = root.querySelector(".dropdown-icon")

    if(content.classList.contains("d-none")) {
      content.classList.remove("d-none");
      dropdown.src = "assets/dropdown-open.svg"
      root.classList.add("open")
    } else {
      content.classList.add("d-none");
      dropdown.src = "assets/dropdown-close.svg"
      root.classList.remove("open")
    }

  })

}


// Sans doute essayer de former 3 array (ingrédients, ustensils,... avec liste de tous les items)
// ingrédients = ["","",]
// ou objets avec ca dedans
// filters {
//   ustensils : ["",""],
//   ingredients: ["", "", ""]
// }
