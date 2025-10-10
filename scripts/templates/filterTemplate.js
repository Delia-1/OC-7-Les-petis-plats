import getRecipes from "../utils/getRecipies.js";
import { ElementFactory } from "../factory/elementsFactory.js";

const filtersObj = [
  { id: "Ingrédients", items: [] },
  { id: "Appareils", items: [] },
  { id: "Ustensiles", items: [] },
];
export const getCategoryItems = (data, category) => {
  const list = [];

  data.forEach((recipe) => {
    if (category === "ingredients") {
      recipe.ingredients.forEach((item) => {
        if (!list.includes(item)) {
          list.push(item.ingredient);
        }
      });
    } else if (category === "appliance") {
      if (!list.includes(recipe.appliance)) {
        list.push(recipe.appliance);
      }
    } else if (category === "ustensils") {
      recipe.ustensils.forEach((ust) => {
        if (!list.includes(ust)) {
          list.push(ust);
        }
      });
    }
  });

  return [...new Set(list)];
};

export const filtersFirstRender= (data) => {

  // const data = getRecipes();
  filtersObj[0].items = getCategoryItems(data, "ingredients");
  filtersObj[1].items = getCategoryItems(data, "appliance");
  filtersObj[2].items = getCategoryItems(data, "ustensils");
}

export function filtersUpdate(filteredRecipes) {
  filtersObj[0].items = getCategoryItems(filteredRecipes, "ingredients");
  filtersObj[1].items = getCategoryItems(filteredRecipes, "appliance");
  filtersObj[2].items = getCategoryItems(filteredRecipes, "ustensils");
}

// getCategoryItems("ingredients").then((itemsArr) => {
//   filtersObj[0].items = itemsArr;
// });
// getCategoryItems("appliance").then((itemsArr) => {
//   filtersObj[1].items = itemsArr;
// });
// getCategoryItems("ustensils").then((itemsArr) => {
//   filtersObj[2].items = itemsArr;
// });
export const displayAside = () => {
  const asideContainer = document.createElement("aside");
  asideContainer.classList.add(
    "search-aside",
    "d-flex",
    "z-3",
    "position-absolute"
  );
  asideContainer.setAttribute("aria-expended", "true");
  asideContainer.setAttribute("data-key", "");

  asideContainer.innerHTML = "";

  filtersObj.forEach((item) => {
    const currentNode = filterSectionTemplate(item);
    const filterName = currentNode.querySelector(".filterName");

    currentNode.dataset.key = item.id;
    filterName.textContent = item.id;

    asideContainer.appendChild(currentNode);

    const list = currentNode.querySelector(".item-list");
    item.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  });
  return asideContainer;
};

export const openFilter = () => {
  const asideContainer = document.querySelector(".search-aside");

  asideContainer.addEventListener("click", (e) => {
    const header = e.target.closest(".filter-header");

    const root = header.closest(".div-filter");
    const content = root.querySelector(".div-filter--content");
    const dropdown = root.querySelector(".dropdown-icon");

    if (content.classList.contains("d-none")) {
      content.classList.remove("d-none");
      dropdown.src = "assets/dropdown-open.svg";
      root.classList.add("open");
    } else {
      content.classList.add("d-none");
      dropdown.src = "assets/dropdown-close.svg";
      root.classList.remove("open");
    }
  });
};

export const filterSectionTemplate = () => {
  const divFilter = ElementFactory.create("div", {
    className: "div-filter m-4 bg-light d-flex flex-column ",
    ariaExpended: "true",
    dataKey: "",
  });

  const divFilterHeader = ElementFactory.create("div", {
    className: "filter-header d-flex justify-content-center align-items-center",
  });

  const filterName = ElementFactory.create("p", {
    className: "filterName m-0",
  });

  const dropdownnIcon = ElementFactory.create("img", {
    className: "dropdown-icon ms-5 ps-3",
    src: "assets/dropdown-close.svg",
    alt: "dropdown icon",
  });
  const divFilterContent = ElementFactory.create("div", {
    className:
      "div-filter--content  d-flex flex-column justify-content-center align-items-stretch d-none",
  });
  const listContainer = ElementFactory.create("div", {
    className: "list-container mb-1",
  });

  const searchInput = ElementFactory.create("input", {
    className: "search-input mb-1 mx-auto",
    ariaAutoComplete: "list",
  });

  const itemList = ElementFactory.create("ul", {
    className: "item-list",
  });

  divFilter.el.appendChild(divFilterHeader.el);
  divFilterHeader.el.appendChild(filterName.el);
  divFilterHeader.el.appendChild(dropdownnIcon.el);
  divFilter.el.appendChild(divFilterContent.el);
  divFilterContent.el.appendChild(searchInput.el);
  divFilterContent.el.appendChild(itemList.el);
  divFilterContent.el.appendChild(listContainer.el);
  listContainer.el.appendChild(itemList.el);

  return divFilter.el;
};
