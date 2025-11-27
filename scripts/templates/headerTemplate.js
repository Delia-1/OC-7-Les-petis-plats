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
  activeTags,
} from "./filterTemplate.js";
import { displayErrorMessage } from "./cardsTemplate.js";

export const displayHeader = () => {
  const header = headerTemplate();

  return header;
};

let isHeaderSearchBound = false;
let headerSearchData = null;
let headerSearchIndex = null;

export const getRightRecipesLaunched = (data, index, e) => {
  if (e && typeof e.preventDefault === "function") e.preventDefault();

  const inputUser = document.querySelector(".search-bar--input").value;

  if (inputUser.length < 3 && inputUser.length !== 0) return;

  const rightIndex = index && index.text ? index.text : {};
  const normalizedInput = normalize(inputUser);
  let allIds = new Set();
  const keys = Object.keys(rightIndex);

  for (let i = 0; i < keys.length; i++) {
    const word = keys[i];
    if (word.startsWith(normalizedInput)) {
      const ids = rightIndex[word];
      for (let j = 0; j < ids.length; j++) {
        allIds.add(ids[j]);
      }
    }
  }
  const uniq = [...allIds];

  updateSearch(uniq, data, index);
};

export const getRightRecipes = (data, index) => {
  if (isHeaderSearchBound) return;
  isHeaderSearchBound = true;

  headerSearchData = data;
  headerSearchIndex = index;

  const searchBtn = document.querySelector(".search-bar--btn");
  const inputUser = document.querySelector(".search-bar--input");

  inputUser.addEventListener("input", () => {
    if (inputUser.value.length < 3) return;
    getRightRecipesLaunched(data, index);
  });

  if (searchBtn) {
    searchBtn.type = searchBtn.type || "button";
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      getRightRecipesLaunched(data, index, e);
    });

    searchBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        getRightRecipesLaunched(data, index, e);
      }
    });
  }
};

export const handleSearchInput = () => {
  const cancelBtn = document.querySelector(".search-bar--cancel");
  const inputEl = document.querySelector(".search-bar--input");

  if (!cancelBtn || !inputEl) return;

  inputEl.addEventListener("input", () => {
    cancelBtn.classList.toggle("d-none", inputEl.value.trim() === "");
  });

  if (!cancelBtn.dataset.bound) {
    cancelBtn.dataset.bound = "1";
    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      inputEl.value = "";

      inputEl.dispatchEvent(new Event("input", { bubbles: true }));
      cancelBtn.classList.add("d-none");
      inputEl.focus();

      if (headerSearchData && headerSearchIndex) {
        getRightRecipesLaunched(headerSearchData, headerSearchIndex, e);
      }
    });
  }
};

export const updateSearch = (uniq, data, index) => {
  const uniqSet = new Set(uniq);
  const filteredData = [];
  for (const recipe of data) {
    if (uniqSet.has(recipe.id)) filteredData.push(recipe);
  }

  filtersUpdate(filteredData);

  const oldAside = document.querySelector(".search-aside");
  const tagList = document.querySelector(".tag-list");
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

  openFilter();
  setupIngredientFilter();
  selectAndUpdate(filteredData, index);
  bindTagBar(index);

  let main = document.querySelector("main");
  if (!main) {
    main = document.createElement("main");
    document.body.appendChild(main);
  }
  const newMain = displayMain(filteredData);
  main.parentNode.replaceChild(newMain, main);

  countData(filteredData);

  if (activeTags.size === 0) {
    setTagBaseline(filteredData);
  }

  if (filteredData.length === 0) {
    const inputUser = document.querySelector(".search-bar--input").value;
    newMain.appendChild(displayErrorMessage(inputUser));
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
    type: "button",
  });

  const loupeIcon = ElementFactory.create("img", {
    src: "assets/loupe-icon.svg",
    alt: "icon loupe",
  });

  const searchBarCancel = ElementFactory.create("button", {
    className: "search-bar--cancel bg-light",
    ariaLabel: "Supprimer recherche",
    type: "button",
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
