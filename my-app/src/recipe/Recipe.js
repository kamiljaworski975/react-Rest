import React from "react";
import { Container } from "../themeComponents/container";
import { RecipeList } from "./RecipeList";
import RecipeInfo from "./RecipeInfo/RecipeInfo";
import { RecipeInfoList } from "./RecipeInfo/RecipeInfoList";
import { RecipeLike } from "./RecipeLike";
import { Buttons } from "./Buttons";
import { AutoComplete } from "./autoComplete/autoComplete";
import * as RecipeTheme from "../themeComponents/Recipe/Recipe";
import Logo from "../assets/yoda.jpg";
import Auth from "../components/auth";

import { Grid, Input } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

class Recipe extends React.Component {
  state = {
    input: "",
    recipes: [],
    message: "",
    isRec: false,
    page: 1,
    resPerPage: 15,
    isLoaded: false,
    error: null,
    info: null,
    ingredient: 0,
    servCount: 0,
    like: [],
    showAuto: false,
  };

  handleOnChange = (e) => {
    this.setState({
      input: e.target.value,
      showAuto: true,
    });
  };

  getRecipe = () => {
    fetch(`https://forkify-api.herokuapp.com/api/search?&q=${this.state.input}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((result) => {
        this.setState({
          isLoaded: true,
          recipes: result ? result.recipes : [],
          isRec: true,
          message: "",
        });
      })
      .catch((error) => {
        this.setState({
          recipes: [],
          isLoaded: false,
          isRec: false,
          message: "Wrong recipe, choose from the list :D",
          error,
        });
      })
      .finally(() => {
        this.setState({ isLoaded: false });
      });
  };

  handleOnClick = () => {
    this.getRecipe();
    this.setState({
      input: "",
    });
  };

  handleInputKey = (event) => {
    if (event.key === "Enter") {
      this.getRecipe();
      this.setState({
        input: "",
      });
    }
  };

  handleAddPages = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  handleMinPages = () => {
    const { page } = this.state;
    this.setState({
      page: page - 1,
    });
  };

  handleRec = (id) => {
    this.setState({
      info: id,
    });
  };

  handleShopping = (ingredient, servCount) => {
    this.setState(
      {
        ingredient: ingredient,
        servCount: servCount,
      },
      () => console.log(ingredient)
    );
  };

  takeLike = (likes) => {
    this.setState(
      (state) => {
        const like = [...state.like, likes];
        return {
          like,
        };
      },
      () => {
        localStorage.setItem("recipe", JSON.stringify(this.state.like));
      }
    );
  };

  handleRemoveLike = (ind) => {
    this.setState(
      (state) => {
        const index = state.like.findIndex((el) => el.id === ind);

        const newLike = state.like;
        newLike.splice(index, 1);
        console.log(index, "ind");
        return {
          like: newLike,
        };
      },
      () => localStorage.setItem("recipe", JSON.stringify(this.state.like))
    );
  };

  handleNavLike = (idLike) => {
    this.setState({
      info: idLike,
    });
  };
  getLike = () => {
    const storage = JSON.parse(localStorage.getItem("recipe"));
    if (storage)
      this.setState({
        like: storage,
      });
  };

  handleClickAuto = (el) => {
    this.setState({ input: el, showAuto: false });
  };

  componentDidMount() {
    this.getLike();
  }

  render() {
    const {
      recipes,
      isRec,
      page,
      resPerPage,
      info,
      ingredient,
      servCount,
      like,
      input,
      message,
      isLoaded,
      showAuto,
    } = this.state;

    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    const maxPage = Math.ceil(recipes.length / resPerPage);
    const likeStart = (page - 1) * 3;
    const likeEnd = page * 3;
    const maxLikePage = Math.ceil(like.length / 3);

    return (
      <Auth>
        <Container theme={this.props.theme}>
          <Grid stackable celled>
            <Grid.Row textAlign="center" verticalAlign="middle">
              <Grid.Column width={4}>
                <RecipeTheme.HeaderLogo src={Logo} />
              </Grid.Column>
              <Grid.Column width={9}>
                <p style={{ color: "red" }}>{message}</p>
                <Input
                  icon={{
                    name: "search",
                    circular: true,
                    link: true,
                    onClick: this.handleOnClick,
                  }}
                  loading={isLoaded}
                  className="autoComplete"
                  value={input}
                  onKeyPress={this.handleInputKey}
                  size="large"
                  placeholder="Search..."
                  onChange={this.handleOnChange}
                  style={{ width: "70%" }}
                />
                {showAuto ? (
                  <AutoComplete
                    inputAuto={input}
                    theme={this.props.theme}
                    handleClickAuto={this.handleClickAuto}
                  />
                ) : null}
              </Grid.Column>
              <Grid.Column width={3}>
                <RecipeTheme.LikesField>
                  <Icon name="heart" size="huge" />
                  <RecipeTheme.RecipeLike>
                    <ul className="likes__list">
                      {like.slice(likeStart, likeEnd).map((el) => {
                        return el ? (
                          <RecipeLike
                            handleNavLike={this.handleNavLike}
                            key={el.id}
                            like={el}
                          />
                        ) : null;
                      })}
                    </ul>

                    {like ? (
                      <Buttons
                        page={page}
                        maxPage={maxLikePage}
                        handleAddPages={this.handleAddPages}
                        handleMinPages={this.handleMinPages}
                      />
                    ) : null}
                  </RecipeTheme.RecipeLike>
                </RecipeTheme.LikesField>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={4}>
                {isRec ? (
                  <RecipeList
                    recipes={recipes}
                    start={start}
                    end={end}
                    handleRec={this.handleRec}
                  />
                ) : null}
                {isRec ? (
                  <Buttons
                    page={page}
                    maxPage={maxPage}
                    handleAddPages={this.handleAddPages}
                    handleMinPages={this.handleMinPages}
                  />
                ) : null}
              </Grid.Column>
              <Grid.Column width={9}>
                {info !== null ? (
                  <RecipeInfo
                    key={info}
                    info={info}
                    handleShop={this.handleShopping}
                    like={
                      like.length > 0
                        ? like.find((el) => {
                            return el.id === info;
                          })
                        : false
                    }
                    handleTakeLike={this.takeLike}
                    handleRemoveLike={this.handleRemoveLike}
                  />
                ) : null}
              </Grid.Column>
              <Grid.Column width={3}>
                {ingredient ? (
                  <h2 className="heading-2">My Shopping List</h2>
                ) : null}
                <RecipeInfoList ingredient={ingredient} servCount={servCount} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Auth>
    );
  }
}

export default Recipe;
