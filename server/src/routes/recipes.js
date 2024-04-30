import { recipesModel } from "../models/recipes.js";
import express from "express";
import { userModel } from "../models/users.js";
import { verifyToken } from "./users.js";

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const response = await recipesModel.find({});
    res.status(200).json({
      response,
      message: "Recipes fetched successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/create", verifyToken, async (req, res) => {
  const recipe = new recipesModel(req.body);
  console.log(recipe);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});
app.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await recipesModel.findById(req.body.recipeId);
    const user = await userModel.findById(req.body.userId);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.log(err);
  }
});
app.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);

    res.json({
      savedRecipes: user?.savedRecipes,
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    const savedRecipes = await recipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({
      savedRecipes,
    });
  } catch (err) {
    console.log(err);
  }
});

export default app;
