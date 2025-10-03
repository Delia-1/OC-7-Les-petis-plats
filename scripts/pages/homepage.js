import { displayMain } from "../templates/cardsTemplate.js";
import { displayAside } from "../templates/filterTemplate.js";
import { displayHeader } from "../templates/headerTemplate.js";


const body = document.querySelector("body")


body.appendChild(displayHeader())
body.appendChild(displayAside())
displayMain().then(main => body.appendChild(main))





// Sans doute essayer de former 3 array (ingrédients, ustensils,... avec liste de tous les items)
// ingrédients = ["","",]
// ou objets avec ca dedans
// filters {
//   ustensils : ["",""],
//   ingredients: ["", "", ""]
// }
