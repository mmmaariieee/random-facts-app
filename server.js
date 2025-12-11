const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const indexRouter = require("./routes/index");
const favoritesRouter = require("./routes/favorites");

const app = express();
const PORT = process.env.PORT || 4000;

const mongoUri = process.env.MONGO_CONNECTION_STRING;

if (!mongoUri) {
    console.error("No MONGO_CONNECTION_STRING");
    process.exit(1);
}

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/favorites", favoritesRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
