const express = require("express");
const FavoriteFact = require("../models/FavoriteFact");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const favorites = await FavoriteFact.find().sort({ createdAt: -1 });
        res.render("favorites", { favorites });
    } catch (err) {
        console.error("Error loading favorites:", err);
        res.render("favorites", { favorites: [] });
    }
});

router.post("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await FavoriteFact.findByIdAndDelete(id);
    } catch (err) {
        console.error("Error deleting favorite:", err);
    }

    res.redirect("/favorites");
});

module.exports = router;
