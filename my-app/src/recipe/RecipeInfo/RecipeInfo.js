import React from "react";
import { Icon, Button } from "semantic-ui-react";

import { RecipeInfoList } from "./RecipeInfoList";
import "./recipeInfo.css";

export default class RecipeInfo extends React.Component {
  state = {
    servings: 4,
    time: 0,
    recipe: 0,
    check: false,
    likes: 0
  };

  addServ = () => {
    this.setState({
      servings: this.state.servings + 1
    });
  };

  minServ = () => {
    this.setState({
      servings: this.state.servings - 1
    });
  };

  handleToggleLike = () => {
    const { recipe, check } = this.state;
    const like = {
      id: this.props.info,
      title: recipe.title,
      publisher: recipe.publisher,
      img: recipe.image_url,
      isCheck: !check
    };
    if (check) {
      // const index = likes.findIndex(el => el.id === info);
      this.props.handleRemoveLike(this.props.info);
    } else {
      this.setState(
        {
          likes: like
        },
        () => {
          this.props.handleTakeLike(this.state.likes);
        }
      );
    }
    this.setState({
      check: !this.state.check
    });
  };

  getRecipeIng = () => {
    fetch(`https://forkify-api.herokuapp.com/api/get?rId=${this.props.info}`)
      .then(res => res.json())
      .then(result => {
        const numIng = result.recipe.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.setState({
          recipe: result.recipe,
          time: periods * 4
        });
      })
      .catch(error => {
        alert(error);
      });
  };

  componentDidMount() {
    this.getRecipeIng();
    this.setState({
      check: this.props.like ? this.props.like.isCheck : false
    });
  }

  render() {
    const { time, recipe, servings, check } = this.state;
    return (
      <div className="recipe">
        <figure className="recipe__fig">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="recipe__img"
          />
          <h1 className="recipe__title">
            <span>{recipe.title}</span>
          </h1>
        </figure>
        <div className="recipe__details">
          <div className="recipe__info">
            <Icon name="clock outline" style={{ marginRight: "10px" }} />
            <span className="recipe__info-data recipe__info-data--minutes">
              {time}
            </span>

            <span className="recipe__info-text"> minutes</span>
            <Icon name="male" />
            <span className="recipe__info-data recipe__info-data--people">
              {servings}
            </span>
            <span className="recipe__info-text">servings</span>

            <div className="recipe--container">
              <div className="recipe__icon--servings" onClick={this.minServ}>
                <Icon
                  className={"recipe--serv"}
                  name="minus"
                  style={{ margin: "0" }}
                />
              </div>
            </div>
            <div className="recipe--container">
              <div className="recipe__icon--servings" onClick={this.addServ}>
                <Icon
                  className={"recipe--serv"}
                  name="plus"
                  style={{ margin: "0" }}
                />
              </div>
            </div>
          </div>

          <div className="recipe__like">
            <div className="recipe__icon--like" onClick={this.handleToggleLike}>
              <Icon
                className={"recipe--like"}
                size="big"
                name={check ? "heart" : "heart outline"}
                style={{ margin: "0" }}
              />
            </div>
          </div>
        </div>

        <div className="recipe__ingredients">
          <ul className="recipe__ingredient-list">
            {recipe ? (
              <RecipeInfoList
                ingredient={recipe.ingredients}
                servCount={servings}
              />
            ) : null}
          </ul>
          <Button
            onClick={() => this.props.handleShop(recipe.ingredients, servings)}
          >
            <div className="recipe__ingredient--btn">
              <Icon name="shopping basket" />
              <p>Add to shopping list</p>
            </div>
          </Button>
        </div>

        <div className="recipe__directions">
          <h2 className="heading-2">How to cook it</h2>
          <p className="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span className="recipe__by">{recipe.publisher}</span>. Please check
            out directions at their website.
          </p>
          <Button>
            <a
              href={recipe.source_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              direction
            </a>
          </Button>
        </div>
      </div>
    );
  }
}
