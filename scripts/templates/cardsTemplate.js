import { ElementFactory } from "../factory/elementsFactory.js";

export const ingredientsTemplate = (recipe) => {
  return recipe.ingredients.map((currentIngredient) => {
    const { ingredient, quantity, unit } = currentIngredient;
    const formatText = () => {
     if (!quantity) return;

      return (quantity && unit )
      ?`${quantity}` + ` ${unit}`
      :`${quantity}`;
    };
    const item = ElementFactory.create("li", {
      className: "list--item",
      text: ingredient,
    });
    const itemDetails = ElementFactory.create("p", {
      className: "list--details",
      text: formatText(),
    });

    item.el.appendChild(itemDetails.el);
    return item.el;
  });
};

export const cardTemplate = (recipe) => {
  const { name, description, image } = recipe;

  const card = ElementFactory.create("article", {
    className: "recipe-card",
  });
  const imgWrapper = ElementFactory.create("div", {
    className: "img-wrapper",
  });

  const recipeImage = ElementFactory.create("img", {
    className: "recipe-image",
    src: `assets/recipesPics/${image}`,
    alt: `photo of ${name}`,
  });


  const recipeContainer = ElementFactory.create("div", {
    className: "recipe-container",
  });


  const recipeTitle = ElementFactory.create("h1", {
    className: "recipe-container--title",
    text: name,
  });
  const recetteSubtitle = ElementFactory.create("h3", {
    className: "recipe-container--recette",
    text: "Recette",
  });

  const instructions = ElementFactory.create("p", {
    className: "recipe-container---description",
    text: description,
  });

    const list = ElementFactory.create("ul", {
    className: "list",
  });
    const ingredientsSubtitle = ElementFactory.create("h3", {
    className: "recipe-container--ingredients",
    text: "Ingredients",
  });

  ingredientsTemplate(recipe).forEach((elem) => {
    list.el.appendChild(elem);
  });

  card.el.appendChild(imgWrapper.el);
  imgWrapper.el.appendChild(recipeImage.el);

  card.el.appendChild(recipeContainer.el)
  recipeContainer.el.appendChild(recipeTitle.el);
  recipeContainer.el.appendChild(recetteSubtitle.el);
  recipeContainer.el.appendChild(instructions.el);
  recipeContainer.el.appendChild(ingredientsSubtitle.el)

  recipeContainer.el.appendChild(list.el);

  return card.el;
};
