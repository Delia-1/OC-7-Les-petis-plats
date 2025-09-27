export class ArticleElement {
  constructor(options = {}) {
    this.el = document.createElement("article");
    this.el.className = options.className || "";
    if (options.role)
      this.el.setAttribute("role", options.role || "");
    if (options.tabindex)
      this.el.setAttribute("tabindex", options.tabindex || "");
    if (options["data-index"] !== undefined) {
      this.el.setAttribute("data-index", options["data-index"]);
    }
    if (options.ariaLabel)
      this.el.setAttribute("aria-label", options.ariaLabel);
  }
}

export class DivElement {
  constructor(options = {}) {
    this.el = document.createElement("div");
    this.el.className = options.className || "";
    if (options.id) this.el.id = options.id;
    if (options.ariaLabel)
      this.el.setAttribute("aria-label", options.ariaLabel);
    if (options.tabindex) this.el.setAttribute("tabindex", "0");
    if (options.role) this.el.setAttribute("role", options.role);
    if (options.ariaLabelledby)
      this.el.setAttribute("aria-labelledby", options.ariaLabelledby);
    if (options.ariaActivedescendant)
      this.el.setAttribute(
        "aria-activedescendant",
        options.ariaActivedescendant
      );
    if (options.ariaSelected)
      this.el.setAttribute("aria-selected", options.ariaSelected);
  }
}

export class HeadingElement {
  constructor(tagName, options = {}) {
    this.el = document.createElement(tagName);
    this.el.className = options.className || "";
    this.el.textContent = options.text || "";
    if (options.ariaLabel)
      this.el.setAttribute("aria-label", options.ariaLabel);
  }
}

export class TextareaElement {
  constructor(options = {}) {
    this.el = document.createElement("textarea");
    this.el.className = options.className || "";
    this.el.textContent = options.text || "";
    if (options.tabindex) this.el.setAttribute("tabindex", options.tabindex);
    if (options.ariaLabel)
      this.el.setAttribute("aria-label", options.ariaLabel);
  }
}

export class ParagraphElement {
  constructor(options = {}) {
    this.el = document.createElement("p");
    this.el.className = options.className || "";
    this.el.textContent = options.text || "";
    if (options.tabindex) this.el.setAttribute("tabindex", options.tabindex);
    if (options.ariaLabel)
      this.el.setAttribute("aria-label", options.ariaLabel);
  }
}

export class ImageElement {
  constructor(options = {}) {
    this.el = document.createElement("img");
    this.el.className = options.className || "";
    this.el.src = options.src || "";
    this.el.alt = options.alt || "";
    if (options.ariaHidden)
      this.el.setAttribute("aria-hidden", options.ariaHidden);
    if (options.name) this.el.setAttribute("name", options.name);
  }
}

export class VideoElement {
  constructor(options = {}) {
    this.el = document.createElement("video");
    this.el.className = options.className || "";
    this.el.src = options.src || "";
    this.el.controls = options.controls || false;
  }
}

export class LabelElement {
  constructor(options = {}) {
    this.el = document.createElement("label");
    this.el.className = options.className || "";
    this.el.textContent = options.text || "";
    this.el.id = options.id;
    if (options.for) this.el.setAttribute("for", options.for);
  }
}

export class LinkElement {
  constructor(options = {}) {
    this.el = document.createElement("a");
    this.el.className = options.className || "";
    this.el.textContent = options.text || "";
    this.el.href = options.href || "#";
    if (options.ariaLabel)
      this.el.setAttribute("aria-label", options.ariaLabel);
  }
}

export class ButtonElement {
  constructor(options = {}) {
    this.el = document.createElement("button");
    this.el.className = options.className || "";
    this.el.id = options.id;
    this.el.textContent = options.textContent;
    if (options.ariaLabel)
      this.el.setAttribute("aria-label", options.ariaLabel);
    if (options.ariaHaspopup)
      this.el.setAttribute("aria-haspopup", options.ariaHaspopup);
    if (options.ariaExpanded)
      this.el.setAttribute("aria-expanded", options.ariaExpanded);
    if (options.ariaLabelledby)
      this.el.setAttribute("aria-labelledby", options.ariaLabelledby);
    if (options.ariaSelected)
      this.el.setAttribute("aria-selected", options.ariaSelected);
    if (options.tabindex) this.el.setAttribute("tabindex", options.tabindex);
    if (options.role) this.el.setAttribute("role", options.role);
  }
}

export class SpanElement {
  constructor(options = {}) {
    this.el = document.createElement("span");
    this.el.className = options.className || "";
    this.el.textContent = options.text || "";
    if (options.tabindex) this.el.setAttribute("tabindex", options.tabindex);
  }
}
export class BrElement {
  constructor() {
    this.el = document.createElement("br");
  }
};

export class ListElement {
  constructor(options = {}) {
    this.el = document.createElement("ul");
    this.el.className = options.className || "";
    this.el.textContent = options.text || "";
  }
}

export class ItemElement {
  constructor(options = {}) {
    this.el = document.createElement("li");
    this.el.className = options.className || "";
    this.el.textContent = options.text || "";
  }
}

export class SectionElement {
  constructor(options = {}) {
    this.el = document.createElement("section");
    this.el.className = options.className || "";
    if (options.ariaLabel)
      this.el.setAttribute("aria-label", options.ariaLabel);
  }
}

export class AsideElement {
  constructor(options = {}) {
    this.el = document.createElement("aside");
    this.el.className = options.className || "";
    this.el.textContent = options.text || "";
    if (options.ariaLabel)
      this.el.setAttribute("aria-label", options.ariaLabel);
    if (options.tabindex) this.el.setAttribute("tabindex", options.tabindex);
  }
}
