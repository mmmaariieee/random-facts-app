const express = require("express");
const axios = require("axios");
const FavoriteFact = require("../models/FavoriteFact");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        fact: null,
        error: null
    });
});

router.post("/fact", async (req, res) => {
    const { factType, language } = req.body;

    const type = factType === "today" ? "today" : "random";
    const lang = language === "de" ? "de" : "en";

    const apiUrl = `https://uselessfacts.jsph.pl/api/v2/facts/${type}?language=${lang}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: { Accept: "application/json" }
        });

        const data = response.data;

        const fact = {
            text: data.text,
            language: data.language || lang,
            type,
            source: data.source || "",
            sourceUrl: data.source_url || ""
        };

        res.render("index", {
            fact,
            error: null
        });
    } catch (err) {
        console.error(err);
        res.render("index", {
            fact: null,
            error: "Could not fetch."
        });
    }
});

router.post("/favorites/add", async (req, res) => {
    const { text, language, type, source, sourceUrl } = req.body;

    if (!text) {
        return res.redirect("/");
    }

    try {
        await FavoriteFact.create({
            text,
            language,
            type,
            source,
            sourceUrl
        });

        res.redirect("/favorites");
    } catch (err) {
        console.error("Error saving favorite:", err);
        res.redirect("/");
    }
});

module.exports = router;
