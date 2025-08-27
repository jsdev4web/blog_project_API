const { Router } = require("express");

const authorRouter = Router();
const authorController = require("../controllers/authorController")

authorRouter.post("/", authorController.createAuthor)
authorRouter.get("/", authorController.getAuthor)
authorRouter.put("/:id", authorController.updateAuthor)
authorRouter.delete("/:id", authorController.deleteAuthor)


module.exports = authorRouter;