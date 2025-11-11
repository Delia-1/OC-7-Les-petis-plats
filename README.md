# 🍳 Les Petits Plats – Étude de Performance & Optimisation

## 🧩 Présentation du projet

Ce projet s’inscrit dans le cadre du parcours **Développeur Front-End OpenClassrooms**.
L’objectif est de développer une **application de recherche de recettes** rapide, claire et maintenable, tout en respectant les bonnes pratiques de performance JavaScript. L'accent est mis sur la performance de la recherche initiale, et les solutions lise en places pour tester les performance de la feature de recherche.

Le site permet à l’utilisateur de :

- **Rechercher des recettes** via un champ principal de recherche (par nom, description ou ingrédients),
- **Filtrer** les résultats via des **filtres dynamiques** (ingrédients, appareils, ustensiles),
- Découvrir en quelques frappes ou au clic les **recettes correspondantes** affichées sous forme de cartes visuelles, générées dynamiquements.

---

## 🧠 Objectif du projet

> Implémenter **le moteur de recherche le plus performant possible** en JavaScript Vanilla,
> et **comparer deux approches** :
>
> - une **implémentation moderne ES6+** (déclarative),
> - une **implémentation classique avec boucles natives**.

Le but final est d’identifier **quelle approche est la plus rapide et maintenable** sur les trois phases principales de l’algorithme :

1. **Tokenisation** (découpage du texte en mots clés),
2. **Indexation complète** (création de l’index inversé),
3. **Recherche** (filtrage des recettes correspondant à l’input utilisateur).

---

## 🧰 Technologies utilisées

- **Langage :** JavaScript ES6+ (Vanilla)
- **Framework CSS :** [Bootstrap 5.3.8](https://getbootstrap.com/)
- **Préprocesseur CSS :** [Sass](https://sass-lang.com/)
- **Outil de build :** NPM Scripts
- **Outil de benchmark :** [jsben.ch](https://jsben.ch/)
- **Navigateurs testés :** Chrome (V8) & Firefox (SpiderMonkey)

---

### 🗂️Structure des dossiers

- `data/` : mock des données de recettes.
- `scripts/` : logique JS (templates, pages, utils, factory, models).
- `assets/` : images et icônes.
- `styles/` : SCSS principal et fichiers partiels.

---

## ⚙️ Fonctionnalités principales

- 🔎 **Recherche instantanée :**
  Affichage des recettes correspondant à la saisie utilisateur (dès 3 caractères) et mise à jour si entrée d'un nouveau charactère .
- 🧠 **Recherche intelligente :**
  Correspondance dans le titre, la description ou les ingrédients.
- 🧩 **Filtres dynamiques :**
  Sélection multiple par ingrédients, appareils et ustensiles. permettant des recherchers croisées
- ⚡ **Optimisation des performances :**
  Mise en place d’un index inversé pour accélérer les recherches.
- 🧪 **Benchmark des performances :**
  Comparaison des performances entre les implémentations modernes et natives.

---

## 🚀 Setup du projet

### 1️⃣ Installation

Clone le dépôt :

```bash
git clone https://github.com/ton-profil/les-petits-plats.git
cd OC-7-Les-petis-plats
```

Installe les dépendances :

```bash
npm install
```

### 2️⃣ Compilation du CSS

Génère le CSS Bootstrap compressé :

```bash
npm run css:build
```

Ou active la compilation automatique (mode watch) :

```bash
npm run css:watch
```

### 3️⃣ Lancement du site

Ouvre le fichier index.html dans ton navigateur.
Aucune autre configuration n’est nécessaire.

---

## 🌿 Branches

**main**

- version moderne ES6+, utilisant des itérations déclaratives (forEach, map, filter).

  **for-loop-branch**
- version native, utilisant des boucles impératives (for, for...of).

Les deux branches offrent les mêmes fonctionnalités fonctionnelles, mais diffèrent dans leurs implémentations algorithmiques.

---

## 🧪 Méthodologie de test de performance

### 🧰 Outil utilisé : [jsben.ch](https://jsben.ch/)

L’outil **jsBench** permet d’exécuter deux blocs de code côte à côte et de mesurer le **nombre d’opérations par seconde**.
Cela permet d’évaluer la rapidité d’exécution de deux fonctions identiques en conditions isolées, sans influence du DOM ni du rendu de l’interface.

---

### 🔧 Setup des tests

Les tests ont été effectués sur du **code pur**, nettoyé de toute référence à l’interface utilisateur (UI).
Chaque test compare les deux implémentations — **moderne** et **classique** — dans les mêmes conditions.

**Configuration du setup :**

- Un dataset cloné artificiellement (`BIG_N = 200 → 1000`) afin de simuler une base de données plus volumineuse.
- Deux versions du code présentes simultanément :
  - `modern` → itérations ES6+ déclaratives (`forEach`, `filter`, `map`)
  - `classic` → boucles impératives (`for`, `for...of`)
- Les tests sont exécutés dans **deux zones de code distinctes** de jsBench :
  - **Code block 1** → version moderne
  - **Code block 2** → version native

---

## 📊 Types de tests réalisés

### **1️⃣ Test de Tokenisation**

> Mesure les performances des fonctions de découpage de texte.
> Objectif : comparer la rapidité entre l’approche moderne (`filter + forEach`) et l’approche classique (`for...of` + `Set`).

**Focus :**

- Vérifier les performances des itérations internes (`filter`, `forEach`)
- Observer le comportement du moteur JS (optimisations JIT)
- Identifier les surcoûts liés à la création de `Set` ou de boucles imbriquées

---

### **2️⃣ Test d’Indexation complète**

> Mesure la vitesse de création de l’index inversé (mots → recettes).
> Cette étape inclut la normalisation (`normalize()`), la tokenisation et la construction des structures de données.

---

### **3️⃣ Test de Recherche**

> Compare la vitesse d’exécution de la recherche en fonction de la saisie utilisateur.
> Cette phase est la plus critique, car elle est exécutée à chaque frappe dans le champ de recherche. ( partir de 3 frapppes)

---

## 📈 Résultats observés

| Étape            | Version la plus performante | Observation                                                      |
| ---------------- | --------------------------- | ---------------------------------------------------------------- |
| **Tokenisation** | 🟢 Moderne (ES6+)           | Profite du JIT et d’optimisations natives du moteur JavaScript   |
| **Indexation**   | ⚖️ Équivalent               | L’écart s’annule : le coût de `normalize()` domine le traitement |
| **Recherche**    | 🟢 Native (boucles)\*\*     | Plus rapide sur gros volumes, exécution directe sans callbacks   |

---

## 🎯 Conclusion

> 🔹 **Tokenisation & Indexation** → conserver la version **moderne (ES6+)**
> 🔹 **Recherche** → adopter une version **native** (boucles impératives)

Cette combinaison d’approches permet :

- une **meilleure lisibilité** et maintenabilité du code,
- des **performances équilibrées** sur toutes les tailles de jeux de données,
- une **expérience utilisateur fluide** même lors de recherches fréquentes ou sur de gros volumes.

---

## 🌱 Optimisations Green IT

Dans une démarche d’éco-conception web, plusieurs optimisations ont été appliquées afin de réduire l’empreinte carbone du site et d’améliorer son **score EcoIndex** :

- 🖼️ **Images optimisées** avec [imageoptimizer.co](https://imageoptimizer.co/) et chargement différé (`loading="lazy"`).
- ⚙️ **Bundling & minification** du JavaScript via **Rollup/Webpack** → réduction de ~70 % du poids total et d’une dizaine de requêtes HTTP à une seule.
- 💾 **Cache localStorage** pour les cartes et l’index inversé, réduisant les recalculs CPU à chaque rechargement.
- 🎨 **CSS minifié** (Sass `--style=compressed`) et préchargement des ressources critiques (images, polices).
- 🔤 **Polices locales** au lieu des CDN externes pour limiter les requêtes réseau.

> 🌍 Ces optimisations améliorent les temps de chargement, réduisent la consommation énergétique et rendent l’application plus respectueuse de l’environnement.

---

## 🧠 Auteur

**Projet réalisé par :** _Delia_
Dans le cadre du parcours **Développeur Front-End – OpenClassrooms**
Projet n°7 : _Les Petits Plats_
📅 **Année :** 2025
