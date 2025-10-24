import { ElementFactory } from "../factory/elementsFactory.js";
import { countData, normalize } from "../utils/getRecipies.js";
import { displayMain } from "./cardsTemplate.js";
import {
  displayAside,
  filtersUpdate,
  selectAndUpdate,
  setupIngredientFilter,
  bindTagBar,
  openFilter,
  setTagBaseline,
  activeTags
} from "./filterTemplate.js";

export const displayHeader = () => {
  const header = headerTemplate();

  return header;
};

let isHeaderSearchBound = false;
// OUI A TRANSFORMER
export const getRightRecipes = (data, index) => {
  if (isHeaderSearchBound) return;
  isHeaderSearchBound = true;

  const searchBtn = document.querySelector(".search-bar--btn");

  searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
    getRightRecipesLaunched()
  });
    searchBtn.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
          e.preventDefault();
        getRightRecipesLaunched()
      }
  });


  const getRightRecipesLaunched = () => {
      const inputUser = document.querySelector(".search-bar--input").value;
      if (inputUser.length < 3) return;

      const rightIndex = index.text;
      const normalizedInput = normalize(inputUser);
      let allIds = [];

      // Object.entries(rightIndex).forEach(([word, ids]) => {
        //   if (word.startsWith(normalizedInput)) allIds.push(...ids);
        // });

        // REMP-forEach
      const entries = Object.entries(rightIndex)
      for (let i = 0; i < entries.length; i++) {
        const pair = entries[i]// toute l'entrée
        const word = pair[0]//Le mot associé
        const ids = pair[1]//L'ids associés
        if (word.startsWith(normalizedInput)) {
          for (let j = 0; j < ids.length ; j++) {
            allIds.push(ids[j])
          }
        }
      }
      const uniq = [...new Set(allIds)];
      console.log("uniq", uniq)

      updateSearch(uniq, data, index);
    }

};

export const updateSearch = (uniq, data, index) => {
  // const filteredData = data.filter((recipe) => uniq.includes(recipe.id));
  
  // REMP filter
  const uniqSet = new Set(uniq)
  const filteredData = [];
  for ( const recipe of data) {
    if (uniqSet.has(recipe.id)) filteredData.push(recipe);
  }

  filtersUpdate(filteredData);

  const oldAside = document.querySelector(".search-aside");
  const tagList = document.querySelector(".tag-list")
  const parent = oldAside?.parentElement;

   if (oldAside) oldAside.remove();
 const newAside = displayAside();
   if (parent) {
    if (tagList && tagList.parentElement === parent) {
      parent.insertBefore(newAside, tagList);
    } else {
      parent.appendChild(newAside);
    }
  }

  openFilter()
  setupIngredientFilter();
  selectAndUpdate(filteredData, index);
  bindTagBar( index);

  let main = document.querySelector("main");
   if (!main) { main = document.createElement("main"); document.body.appendChild(main); }
  main.innerHTML = "";

  main.appendChild(displayMain(filteredData));


  countData(filteredData)

   if (activeTags.size === 0) {
   setTagBaseline(filteredData);
 }
};

export const headerTemplate = () => {
  const headerContainer = ElementFactory.create("header", {
    className:
      "position-relative d-flex flex-column justify-content-center align-items-center",
  });

  const homepageLink = ElementFactory.create("a", {
    className: "position-absolute top-0 start-0 mt-5",
    href: "index.html",
    ariaLabel: "Retourner à la page d'accueil",
  });

  const logo = ElementFactory.create("img", {
    className: "dropdown-icon ms-5 ps-3",
    src: "assets/logo.svg",
    alt: "logo Les petits plats",
  });

  const headerContent = ElementFactory.create("div", {
    className: "content d-flex flex-column align-items-center my-auto",
  });

  const title = ElementFactory.create("h1", {
    className: "lh-base header--title text-yellow text-center mt-2 pt-5",
  });
  title.el.innerHTML =
    "CHERCHEZ PARMI PLUS DE 1500 RECETTES<br>DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES ";

  const form = ElementFactory.create("form", {
    className: "mt-3",
  });

  const searchBar = ElementFactory.create("div", {
    className: "search-bar d-flex flex-row-reverse bg-light",
  });

  const searchBarBtn = ElementFactory.create("button", {
    className: "search-bar--btn bg-dark",
    ariaLabel: "Rechercher",
  });

  const loupeIcon = ElementFactory.create("img", {
    src: "assets/loupe-icon.svg",
    alt: "icon loupe",
  });

  const searchBarCancel = ElementFactory.create("button", {
    className: "search-bar--cancel bg-light",
    ariaLabel: "Supprimer recherche",
  });

  const crossIcon = ElementFactory.create("img", {
    className: "dropdown-icon ms-5 ps-3",
    src: "assets/cross-icon.svg",
    alt: "icon fermer",
  });

  const labelsearch = ElementFactory.create("label", {
    for: "contenu-recherche",
  });

  const inputSearch = ElementFactory.create("input", {
    className: "search-bar--input bg-light",
    id: "contenu-recherche",
    type: "text",
    placeholder: "Rechercher une recette, un ingrédient, ...",
  });

  headerContainer.el.appendChild(homepageLink.el);
  homepageLink.el.appendChild(logo.el);
  headerContainer.el.appendChild(headerContent.el);

  headerContent.el.appendChild(title.el);
  headerContent.el.appendChild(form.el);

  form.el.appendChild(searchBar.el);
  searchBar.el.appendChild(searchBarBtn.el);
  searchBarBtn.el.appendChild(loupeIcon.el);
  searchBar.el.appendChild(searchBarCancel.el);
  searchBarCancel.el.appendChild(crossIcon.el);
  searchBar.el.appendChild(searchBarCancel.el);

  searchBar.el.appendChild(labelsearch.el);
  searchBar.el.appendChild(inputSearch.el);

  return headerContainer.el;
};
