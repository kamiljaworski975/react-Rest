import React from "react";
import { dataRecipe } from "./dataRecipe";
import "./autoComplete.css";

export const AutoComplete = ({ inputAuto, handleClickAuto, theme }) => {
  return (
    <>
      <div
        className="autocomplete-items"
        style={{
          backgroundColor: theme === "light" ? "grey" : "white",
          color: "black",
        }}
      >
        {dataRecipe.map((el, id) => {
          if (
            el.substr(0, inputAuto.length).toUpperCase() ===
              inputAuto.toUpperCase() &&
            inputAuto.length > 0
          ) {
            return (
              <div
                style={{
                  border:
                    theme === "light"
                      ? "1px solid white"
                      : "1px solid lightgrey",
                }}
                key={id}
                onClick={() => handleClickAuto(el)}
              >
                <strong>{el.substr(0, inputAuto.length)}</strong>
                {el.substr(inputAuto.length)}
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
