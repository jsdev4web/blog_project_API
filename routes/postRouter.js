const { Router } = require("express");
const postController = require("../controllers/postController")

const postRouter = Router();


postRouter.post("/:id", verifyToken, postController.createPost);
postRouter.get("/:id", postController.getPost);
postRouter.put("/:id/:postId", postController.updatePost)
postRouter.delete("/:id/:postId", postController.deletePost);
postRouter.post("/login/:id", postController.loginPost);

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        bearerToken = bearer[1]; // token key
        req.token = bearerToken;
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports = postRouter;