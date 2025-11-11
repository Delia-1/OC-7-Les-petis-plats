import { ElementFactory } from "../factory/elementsFactory.js";
import { openFilter } from "./filterTemplate.js";

export const displayMain = (data) => {
  const cacheKey = "recipeCards";
  const main = document.createElement("main");
  main.classList.add("z-2");

const cachedLength = localStorage.getItem(cacheKey + '_length');
  const cachedHTML = localStorage.getItem(cacheKey + '_html');

  if (cachedLength && parseInt(cachedHTML) === data.length && cachedHTML) {  // Vérifiez si les données ont changé
    main.innerHTML = cachedHTML;  // Injectez le HTML mis en cache
  } else {
    data.forEach((recipe) => {
      main.appendChild(cardTemplate(recipe));
    });
    localStorage.setItem(cacheKey + '_html', main.innerHTML);
    localStorage.setItem(cacheKey + '_length', data.length.toString());
  }

  openFilter();
  return main;
};

export const displayErrorMessage = (inputUser) => {
  const errorWrapper = ElementFactory.create("div", {
    className: "error-wrapper",
  });
  const errorMessage = ElementFactory.create("h4", {
    className: "error-message",
    text: `Aucune recette ne contient « ${inputUser} » vous pouvez chercher « tarte aux pommes », « poisson »`,
  });
  errorWrapper.el.appendChild(errorMessage.el);
  return errorWrapper.el;
};

export const ingredientsTemplate = (recipe) => {
  return recipe.ingredients.map((currentIngredient) => {
    const { ingredient, quantity, unit } = currentIngredient;
    const formatText = () => {
      if (!quantity) return;

      return quantity && unit ? `${quantity}` + ` ${unit}` : `${quantity}`;
    };
    const item = ElementFactory.create("li", {
      className: "list--item text-dark",
      text: ingredient,
    });
    const itemDetails = ElementFactory.create("p", {
      className: "list--details text-grey",
      text: formatText(),
    });

    item.el.appendChild(itemDetails.el);
    return item.el;
  });
};

export const cardTemplate = (recipe) => {
  const { name, description, image, time } = recipe;

  const card = ElementFactory.create("article", {
    className: "recipe-card bg-light d-flex flex-wrap position-relative",
  });
  const imgWrapper = ElementFactory.create("div", {
    className: "img-wrapper",
  });

  const recipeImage = ElementFactory.create("img", {
    className: "recipe-image",
    src: `assets/recipesPics/${image}`,
    alt: `photo of ${name}`,
    loading: "lazy",
  });

  const timeTag = ElementFactory.create("div", {
    className:
      "time-tag rounded-pill bg-yellow position-absolute text-dark d-flex align-items-center justify-content-center",
    text: `${time}min`,
  });

  const recipeContainer = ElementFactory.create("div", {
    className: "recipe-container p-4 pb-2",
  });

  const recipeTitle = ElementFactory.create("h2", {
    className: "recipe-container--title text-dark py-2 m-0",
    text: name,
  });
  const recetteSubtitle = ElementFactory.create("p", {
    className: "recipe-container--recette text-grey pt-4 m-0",
    text: "RECETTE",
  });

  const instructions = ElementFactory.create("p", {
    className: "recipe-container---description  my-3 text-dark",
    text: description,
  });

  const list = ElementFactory.create("ul", {
    className: "list p-2 mb-5",
  });
  const ingredientsSubtitle = ElementFactory.create("p", {
    className: "recipe-container--ingredients text-grey pt-3 m-0 ",
    text: "INGREDIENTS",
  });

  ingredientsTemplate(recipe).forEach((elem) => {
    list.el.appendChild(elem);
  });

  card.el.appendChild(imgWrapper.el);
  card.el.appendChild(timeTag.el);
  imgWrapper.el.appendChild(recipeImage.el);

  card.el.appendChild(recipeContainer.el);
  recipeContainer.el.appendChild(recipeTitle.el);
  recipeContainer.el.appendChild(recetteSubtitle.el);
  recipeContainer.el.appendChild(instructions.el);
  recipeContainer.el.appendChild(ingredientsSubtitle.el);

  recipeContainer.el.appendChild(list.el);

  return card.el;
};
