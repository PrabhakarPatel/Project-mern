import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedReciped, setSavedReciped] = useState([]);
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        setRecipes(response.data.response);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recipes/savedRecipes/${userId}`
        );
        setSavedReciped(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    if (cookies.access_token) fetchedRecipes();
    fetchRecipe();
  }, []);

  const savedRecipe = async (recipeId) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/recipes",
        {
          recipeId,
          userId,
        },
        {
          headers: {
            authorization: cookies.access_token,
          },
        }
      );
      setSavedReciped(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };
  const isRecipeSaved = (id) => savedReciped.includes(id);
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => savedRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>

            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>cooking time :{recipe.cookingTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
