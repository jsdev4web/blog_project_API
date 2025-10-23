const { Router } = require("express");
const commentController = require("../controllers/commentController")

const commentRouter = Router();

commentRouter.post("/:userid/user/:postid/comment", commentController.createComment); //comment/:commentId
commentRouter.get("/:id", commentController.getComment);
commentRouter.get("/", commentController.getAllComment)
commentRouter.get("/post/:postid", commentController.getPostIdComment)
commentRouter.put("/:id/user/:userid", commentController.updateComment)
commentRouter.delete("/:id", commentController.deleteComment);

module.exports = commentRouter;