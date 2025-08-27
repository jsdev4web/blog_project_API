const express = require("express");
const fs = require("fs/promises");  //file store module
const path = require("node:path");
const { v4: uuid } = require("uuid"); // create random id numbers
const authorRouter = require("./routes/authorRouter");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

const app = express(); //initate my app

app.use(express.json()); //parse json data
app.use(express.urlencoded({ extended: true })); //process data submit by forms

app.use("/author", authorRouter)
app.use("/users", userRouter)
app.use("/posts", postRouter)

app.get("/", (req, res) => {
    console.log("test")
    res.send("Hello form homepage")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is live on port ${PORT}`)
})