import React from "react";

export const RecipeLike = ({ like, handleNavLike, start, end }) => {
  return (
    <li onClick={() => handleNavLike(like.id)}>
      <div className="likes__link">
        <figure className="likes__fig">
          <img src={like.img} alt={like.title} />
        </figure>
        <div className="likes__data">
          <h4 className="likes__name">{like.title}</h4>
          <p className="likes__author">{like.publisher}</p>
        </div>
      </div>
    </li>
  );
};
