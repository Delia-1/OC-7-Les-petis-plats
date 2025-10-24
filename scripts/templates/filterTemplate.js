import {
  normalize,
  getRecipeIdsFromKeywords,
  indexData,
} from "../utils/getRecipies.js";
import { ElementFactory } from "../factory/elementsFactory.js";
import { updateSearch } from "./headerTemplate.js";

export const activeTags = new Set();

let tagBaselineData = [];

export const setTagBaseline = (data) => {
  // set une seule fois (avant 1er tag)
  tagBaselineData = Array.isArray(data) ? data : [];
};

export const getTagBaseline = () => tagBaselineData;

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
        const name = item.ingredient;
        if (!list.includes(name)) list.push(name);
      });
    } else if (category === "appliance") {
      if (!list.includes(recipe.appliance)) list.push(recipe.appliance);
    } else if (category === "ustensils") {
      recipe.ustensils.forEach((ust) => {
        if (!list.includes(ust)) list.push(ust);
      });
    }
  });

  return [...new Set(list)];
};

export const filtersFirstRender = (data) => {
  filtersObj[0].items = getCategoryItems(data, "ingredients");
  filtersObj[1].items = getCategoryItems(data, "appliance");
  filtersObj[2].items = getCategoryItems(data, "ustensils");
};

export function filtersUpdate(filteredRecipes) {
  console.log("2 filtersUpdate ici", filteredRecipes);
  filtersObj[0].items = getCategoryItems(filteredRecipes, "ingredients");
  filtersObj[1].items = getCategoryItems(filteredRecipes, "appliance");
  filtersObj[2].items = getCategoryItems(filteredRecipes, "ustensils");
}

export const displayAside = () => {
  const asideContainer = ElementFactory.create("aside", {
    className: " search-aside d-flex z-3 position-relative w-100",
    ariaExpended: true,
    dataKey: "",
    innerHTML: "",
  });

  const countDiv = ElementFactory.create("div", {
    className: "count-div position-absolute",
  });

  const countText = ElementFactory.create("h3", {
    className: "count-text ",
    text: "",
  });

  asideContainer.el.appendChild(countDiv.el);

  countDiv.el.appendChild(countText.el);

  filtersObj.forEach((item) => {
    const currentNode = filterSectionTemplate(item);
    const filterName = currentNode.querySelector(".filterName");

    currentNode.dataset.key = item.id;
    filterName.textContent = item.id;
    asideContainer.el.appendChild(currentNode);
    displayLiFilters(currentNode, item);
  });

  return asideContainer.el;
};

export const displayTagList = () => {
  const tagList = ElementFactory.create("ul", {
    className: "tag-list d-flex gap-2",
  });
  return tagList.el;
};

export const displayLiFilters = (currentNode, item) => {
  const list = currentNode.querySelector(".item-list");
  item.items.forEach((item) => {
    const li = ElementFactory.create("li", {
      id: normalize(item),
      text: item,
      className: "list-item",
    });
    list.appendChild(li.el);
  });
};

export const openFilter = () => {
  const aside = document.querySelector(".search-aside");
  if (!aside || aside.dataset.toggleBound === "1") return;
  aside.dataset.toggleBound = "1";

  aside.addEventListener("click", (e) => {
    const header = e.target.closest(".filter-header");
    if (!header) return;

    const root = header.closest(".div-filter");
    const content = root.querySelector(".div-filter--content");
    const dropdown = root.querySelector(".dropdown-icon");

    const open = !root.classList.contains("open");
    root.classList.toggle("open", open);
    content.classList.toggle("d-none", !open);
    if (dropdown)
      dropdown.src = open
        ? "assets/dropdown-open.svg"
        : "assets/dropdown-close.svg";
  });
};

export const setupIngredientFilter = (data, index) => {
  const inputIngredient = document.querySelectorAll(".search-input");
  inputIngredient.forEach((input) => {
    if (input.dataset.bound === "1") return;
    input.dataset.bound = "1";

    const list = input.parentElement.querySelector(".item-list");
    if (!input || !list) return;

    let filteredList = [];
    const items = list.querySelectorAll("li");
    items.forEach((item) => {
      filteredList.push(item.innerHTML);
    });

    input.addEventListener("keyup", (e) => {
      const newFilteredList = filteredList.filter((item) =>
        normalize(item).includes(normalize(input.value))
      );
      newFilteredList.sort();
      list.innerHTML = "";
      console.log("list", newFilteredList);

      displayLiFilters(list.closest(".div-filter"), { items: newFilteredList });

      selectAndUpdate(data, index);

      return newFilteredList;
    });
  });
};

export const selectAndUpdate = (data, index) => {
  const aside = document.querySelector(".search-aside");
  if (!aside || aside.dataset.selectBound === 1) return;
  aside.dataset.selectBound = "1";

  aside.addEventListener("click", (e) => {
    const li = e.target.closest(".list-item");
    if (!li || !(li instanceof HTMLElement)) return;
    const label = li.textContent.trim();
    if (activeTags.size === 0)
      setTagBaseline(Array.isArray(data) ? data : getTagBaseline());
    displayTags(label);
    recomputeFromTags(index);
  });
};

export const displayTags = (tagName) => {
  const tagList = document.querySelector(".tag-list");

  const key = normalize(tagName);
  if (activeTags.has(key)) return;
  activeTags.add(key);

  const li = ElementFactory.create("li", {
    className:
      "tag bg-yellow d-flex justify-content-between align-items-center text-dark",
    text: tagName,
    dataset: { key },
  });
  li.el.dataset.key = key;

  const cutTag = ElementFactory.create("button", {
    className: "cut-tag",
    ariaLabel: `Retirer le filtre « ${tagName} »`,
  });

  const close = ElementFactory.create("img", {
    className: " close-img",
    src: "assets/darkCrossIcon.svg",
    alt: "supprimer le tag",
  });
  li.el.appendChild(cutTag.el);
  cutTag.el.appendChild(close.el);
  tagList.appendChild(li.el);
};

const recomputeFromTags = (index) => {
  const base = getTagBaseline();
  const safeIndex =
    index && index.filters
      ? index
      : indexData(Array.isArray(base) ? base : getTagBaseline());
  const keywords = [...activeTags];
  const ids = keywords.length
    ? getRecipeIdsFromKeywords(keywords, safeIndex.filters)
    : base.map((r) => r.id);
  updateSearch(ids, base, safeIndex);
};

export const bindTagBar = (index) => {
  const tagList = document.querySelector(".tag-list");
  if (!tagList || tagList.dataset.bound === "1") return;
  tagList.dataset.bound = "1";

  tagList.addEventListener("click", (e) => {
    const btn = e.target.closest(".cut-tag");
    if (!btn) return;
    const tag = btn.closest(".tag");
    const key = tag?.dataset?.key;

    if (!key) return;
    console.log("clicked");
    activeTags.delete(key);
    tag.remove();
    recomputeFromTags(index);
  });
};

export const filterSectionTemplate = () => {
  const divFilter = ElementFactory.create("div", {
    className: "div-filter bg-light d-flex flex-column ",
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
