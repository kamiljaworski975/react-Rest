import React from "react";
import { Icon } from "semantic-ui-react";

let Fraction = require("fraction.js");

export const List = ({ ingredient, servCount }) => {
  const formatCount = count => {
    if (count && servCount === 4) {
      const mark = new Fraction(count);
      const edditMark = mark.toFraction(true);
      return edditMark;
    } else if (servCount !== 4) {
      const newCount = (servCount / 4) * ingredient.count;
      const mark = new Fraction(newCount);
      const edditMark = mark.toFraction(true);
      return edditMark;
    }
    return "?";
  };
  return (
    <li className="recipe__item">
      <Icon name="check circle outline" style={{ marginRight: "10px" }} />
      <div className="recipe__count">
        {ingredient ? formatCount(ingredient.count) : "?"}
      </div>
      <div className="recipe__ingredient">
        <span className="recipe__unit">
          {ingredient ? ingredient.unit : "?"}
        </span>{" "}
        {ingredient ? ingredient.ingredient : "?"}
      </div>
    </li>
  );
};
