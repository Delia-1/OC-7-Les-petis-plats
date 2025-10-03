import { ElementFactory } from "../factory/elementsFactory.js";

const filtersObj = [
    {"id": "Ingrédients",
      "items": ["coco", "lait"]},
    {"id": "Appareils",
      "items": ["four", "BBQ"]},
    {"id": "Ustensiles",
      "items" : ["fourchette", "fouet"]}
]

export const displayAside = () => {
  const asideContainer = document.createElement("aside")
  asideContainer.classList.add("search-aside", "d-flex", "z-3", "position-absolute")
  asideContainer.setAttribute("aria-expended", "true");
  asideContainer.setAttribute("data-key", "")

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
return asideContainer
}


export const openFilter = () => {
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

export const filterSectionTemplate = () => {

  const divFilter = ElementFactory.create("div", {
    className:
      "div-filter m-4 bg-light d-flex flex-column align-items-center",
    ariaExpended: "true",
    dataKey: ""
  });

  const divFilterHeader = ElementFactory.create("div", {
    className:
      "filter-header d-flex justify-content-center align-items-center",
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

  return divFilter.el;
};
