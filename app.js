const express = require("express");
const path = require("node:path");

const authorRouter = require("./routes/authorRouter");
const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");

const cors = require('cors');
const app = express(); //initate my app

app.use(express.json()); //parse json data
app.use(express.urlencoded({ extended: true })); //process data submit by forms

app.use(cors())
app.use("/authors", authorRouter)
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

app.get("/", (req, res) => {
    const data = { message: "Hello form homepage"}
    res.json(data)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is live on port ${PORT}`)
})