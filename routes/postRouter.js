const { Router } = require("express");
const postController = require("../controllers/postController");
const { verify } = require("jsonwebtoken");

const postRouter = Router();


postRouter.post("/login", postController.loginPost)
postRouter.post("/:id", verifyToken, postController.createPost);
postRouter.get("/:id", postController.getPost);
postRouter.put("/:id/:postId", postController.updatePost)
postRouter.delete("/:id/:postId", postController.deletePost);


//Format of Token = Authorization: Bearer <access_token>
//Verify token
function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeadeer = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeadeer !== 'undefined') {
         //Split at the space
         const bearer = bearerHeadeer.split(" ");
         //Get token from array
         const bearToken = bearer[1];
         //Set token
         req.token = bearToken;
         next()
    } else {
        //Forbidden
        res.sendStatus(403);
    }

}

module.exports = postRouter;