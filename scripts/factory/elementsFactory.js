import {
  ArticleElement,
  HeaderElement,
  DivElement,
  SectionElement,
  HeadingElement,
  ParagraphElement,
  TextareaElement,
  ImageElement,
  VideoElement,
  FormElement,
  LabelElement,
  LinkElement,
  ButtonElement,
  AsideElement,
  SpanElement,
  BrElement,
  InputElement,
  ListElement,
  ItemElement,
} from '../models/elementsModels.js';


export class ElementFactory {
  static create(elementType, options={}) {
    switch (elementType) {
      case "article":
        return new ArticleElement(options);
       case "header":
        return new HeaderElement(options);
      case "div":
        return new DivElement(options);
      case "section":
        return new SectionElement(options);
      case "h1":
      case "h2":
      case "h3":
        return new HeadingElement(elementType, options);
      case "textarea":
        return new TextareaElement( options)
      case 'p':
        return new ParagraphElement(options);
      case "img":
        return new ImageElement(options);
      case "video":
        return new VideoElement(options);
      case "form":
        return new FormElement(options);
      case 'label':
        return new LabelElement(options);
      case "a":
        return new LinkElement(options);
      case "button":
        return new ButtonElement(options);
      case "ul":
        return new ListElement(options);
      case "li":
        return new ItemElement(options);
      case "input":
        return new InputElement(options);
      case "aside":
        return new AsideElement(options)
      case "span":
        return new SpanElement(options);
      case "br":
        return new BrElement();
      default:
        throw new Error(`Type d'element ${elementType} non supporté`);
    }
  }
}
