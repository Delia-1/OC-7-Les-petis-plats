 const getRecipes = async () => {
  const data = recipes
  // const ingredientsObj = data.forEach(recipe => {
  //   recipe.ingredients[0]
  // })
  // console.log("ingredients for:", data[0].name,"       ", data[0].ingredients[0])
  return data
};

export default getRecipes
