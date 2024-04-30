import axios from "axios";
import React, { useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Createrecipes = () => {
  const userID = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const navigate = useNavigate();
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/recipes/create",
        { ...recipe },
        {
          headers: {
            authorization: cookies.access_token,
          },
        }
      );
      alert("Recipes created successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipes</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="enter your recipe name"
          onChange={handleChange}
        />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            placeholder="enter you ingredient"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          ></input>
        ))}
        <button onClick={handleAddIngredient} type="button">
          Add ingredients
        </button>
        <label htmlFor="instructions">instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">imageUrl</label>
        <input
          onChange={handleChange}
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="enter your recipe imageUrl"
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          onChange={handleChange}
          type="number"
          id="cookingTime"
          name="cookingTime"
          placeholder="enter your cooking time"
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default Createrecipes;
