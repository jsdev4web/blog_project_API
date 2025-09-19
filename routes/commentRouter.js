const { Router } = require("express");
const commentController = require("../controllers/commentController")

const commentRouter = Router();

commentRouter.post("/:id/user/:userid/comment", commentController.createComment); //comment/:commentId
commentRouter.get("/:id", commentController.getComment);
commentRouter.put("/:id/user/:userid", commentController.updateComment)
commentRouter.delete("/:id", commentController.deleteComment);

module.exports = commentRouter;