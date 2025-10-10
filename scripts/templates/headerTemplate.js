import { ElementFactory } from "../factory/elementsFactory.js";
import getRecipes from "../utils/getRecipies.js";
import { displayMain } from "./cardsTemplate.js";

export const displayHeader = () => {
  const header = headerTemplate();
  return header;
};

function normalize(s) {
  const newS = s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
  return newS;
}

export const indexData = (data) => {
  let index = new Object();

  data.forEach((recipe) => {
    let tokens = new Set();

    recipe.description
      .replace(/[.,;:!?()]/g, "")
      .split(/\s+/)
      .filter((w) => w.length >= 3)
      .forEach((w) => tokens.add(w));

    recipe.name
      .split(/\s+/)
      .filter((w) => w.length >= 3)
      .forEach((w) => tokens.add(w));

    recipe.ingredients.forEach((part) => {
      part.ingredient
        .replace(/[.,;:!?()]/g, "")
        .split(/\s+/)
        .filter((w) => w.length >= 3)
        .forEach((w) => tokens.add(w));
    });

    tokens.forEach((token) => {
      const word = normalize(token);
      if (!index[word]) index[word] = [];
      if (!index[word].includes(recipe.id)) {
        index[word].push(recipe.id);
      }
    });
    return index;
  });

  console.log(index);
  return index;
};


export const getRightRecipes = (data) => {
  const index = indexData(data);
  const inputUser = document.querySelector(".search-bar--input");

  inputUser.addEventListener("keyup", (e) => {
    if (e.target.value.length >= 3) {
      let found = false;
      let allIds = [];

      Object.entries(index).forEach(([word, ids]) => {
        if (word.startsWith(normalize(e.target.value))) {
          allIds.push(...ids);
          found = true;
        }
      });
      const uniq = [...new Set(allIds)];
      displayFiltered(uniq, data);

      !found && displayFiltered([], data);
    }
  });
};

export const displayFiltered = (uniq, data) => {
  const updatedData = data.filter((recipe) => uniq.includes(recipe.id));

  let main = document.querySelector("main");

  main.innerHTML = "";
  main.appendChild(displayMain(updatedData));
};

export const headerTemplate = () => {
  const headerContainer = ElementFactory.create("header", {
    className:
      "position-relative d-flex flex-column justify-content-center align-items-center",
  });

  const homepageLink = ElementFactory.create("a", {
    className: "position-absolute top-0 start-0 ps-4 m-5",
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
    className: "lh-base header--title text-yellow text-center mt-4 pt-5",
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
