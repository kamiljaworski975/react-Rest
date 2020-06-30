import React, { useState, useEffect } from "react";
import { List } from "./List";

export const RecipeInfoList = ({ ingredient, servCount }) => {
  const [ingredients, setIngredients] = useState(0);

  const parseIng = () => {
    const ingLong = [
      "tablespoons",
      "tablespoon",
      "teaspoons",
      "teaspoon",
      "cups",
      "cup",
      "ounce",
      "ounces"
    ];

    const ingShort = ["tbsp", "tbsp", "tsp", "tsp", "cup", "cup", "oz", "oz"];

    const units = [...ingShort, "kg", "g"];

    const newIngredients = ingredient
      ? ingredient.map(el => {
          let ingredients = el.toLowerCase();
          ingLong.forEach((unit, i) => {
            ingredients = ingredients.replace(unit, ingShort[i]);
          });

          ingredients = ingredients.replace(/ *\([^)]*\) */g, " ");
          const arrIng = ingredients.split(" ");

          const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

          let objIng;

          if (unitIndex > -1) {
            const arrCount = arrIng.slice(0, unitIndex);
            let count;
            const e = eval;
            if (arrCount.length === 1) {
              count = e(arrIng[0].replace("-", "+"));
            } else {
              count = e(arrIng.slice(0, unitIndex).join("+"));
            }

            objIng = {
              count: count,
              unit: arrIng[unitIndex],
              ingredient: arrIng.slice(unitIndex + 1).join(" ")
            };
          } else if (parseInt(arrIng[0], 10)) {
            objIng = {
              count: parseInt(arrIng[0], 10),
              unit: "",
              ingredient: arrIng.slice(1).join(" ")
            };
          } else if (unitIndex === -1) {
            objIng = {
              count: 1,
              unit: "",
              ingredient: ingredients
            };
          }
          return objIng;
        })
      : null;
    setIngredients(newIngredients);
  };

  useEffect(() => {
    parseIng();
  }, [ingredient]);

  if (ingredients) {
    return (
      <>
        {ingredients.map((el, id) => {
          return <List key={id} ingredient={el} servCount={servCount} />;
        })}
      </>
    );
  } else {
    return null;
  }
};
