const { Router } = require("express");
const postController = require("../controllers/postController");
const jwt = require('jsonwebtoken'); // Assuming you're using jsonwebtoken library


const postRouter = Router();

const authenticateToken = (req, res, next) => {
    //const authHeader = req.header['authorization'];
    const token = req.headers.authorization;
    //console.log(req.headers.authorization)
    //console.log(authHeader)
    

    //const token = authHeader && authHeader.split(' ')[1];
    //const token = authHeader.split(' ')[1];

    //console.log(token)

    if(token === null) {
        return res.sendStatus(401);
    }

    //Try to troubleshoot authorizaion of client
    
    jwt.verify(token, 'secretkey', (err, user) => {
        //console.log(token)
        if (err){
            return res.sendStatus(403);
        }
        req.user = user;
        next()
    })
}


postRouter.post("/login", postController.loginPost)
//postRouter.post("/:id", verifyToken, postController.createPost);
postRouter.post("/", authenticateToken, postController.createPost);
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