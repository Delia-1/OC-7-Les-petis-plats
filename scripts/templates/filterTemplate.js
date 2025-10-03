import { ElementFactory } from "../factory/elementsFactory.js";

export const filterSectionTemplate = (filter) => {
  const divFilter = ElementFactory.create("div", {
    className:
      "div-filter m-4 bg-light d-flex flex-column align-items-center",
    // text: "Ingrédients",
    ariaExpended: "true",
    dataKey: ""
  });

  const divFilterHeader = ElementFactory.create("div", {
    className:
      "filter-header d-flex justify-content-center align-items-center",
    // text: "Ingrédients",
    // role: "button"
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
    className: "div-filter--content  d-flex flex-column d-none",
  });

  const searchInput = ElementFactory.create("input", {
    className: "search-input",
    ariaAutoComplete: "list",
  });

  const itemList = ElementFactory.create("ul", {
    className : "item-list"
  })

  divFilter.el.appendChild(divFilterHeader.el);
  divFilterHeader.el.appendChild(filterName.el);
  divFilterHeader.el.appendChild(dropdownnIcon.el);
  divFilter.el.appendChild(divFilterContent.el);
  divFilterContent.el.appendChild(searchInput.el);
  divFilterContent.el.appendChild(itemList.el);

  // <input list="opts"><datalist id="opts">…</datalist>

  // recipeContainer.el.appendChild(list.el);

  // return ...;
  return divFilter.el;
};
