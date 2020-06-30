import React from "react";
import "./styleRecipe.css";

export const RecipeList = ({ recipes, start, end, handleRec }) => {
  const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
      title.split(" ").reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          newTitle.push(cur);
        }
        return acc + cur.length;
      }, 0);
      return `${newTitle.join(" ")} ...`;
    }
    return title;
  };

  return (
    <>
      <ul className="results__list">
        {recipes.slice(start, end).map(recipe => {
          return (
            <li
              key={recipe.recipe_id}
              onClick={() => handleRec(recipe.recipe_id)}
            >
              <div className="results__link">
                <figure className="results__fig">
                  <img src={recipe.image_url} alt={recipe.title} />
                </figure>
                <div className="results__data">
                  <h4 className="results__name">
                    {limitRecipeTitle(recipe.title)}
                  </h4>
                  <p className="results__author">{recipe.publisher}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
