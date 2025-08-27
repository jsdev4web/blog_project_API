const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController")


userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getUser);
userRouter.put("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;