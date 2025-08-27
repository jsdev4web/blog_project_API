const { Router } = require("express");
const postController = require("../controllers/postController")

const postRouter = Router();

postRouter.post("/:id", postController.createPost);
postRouter.get("/", postController.getPost);
postRouter.put("/:id", postController.updatePost)
postRouter.delete("/:id", postController.deletePost);

module.exports = postRouter;