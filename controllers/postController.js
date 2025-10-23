
const { result, forEach } = require("lodash")
const db = require("../prismaClient")
const { post, connect } = require("../routes/authorRouter")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');


async function loginPost(req, res) {
    //I need to fix how to get a specific author later
    const user = await db.author.findMany();

    //console.log(user)
    //this is wheree the token is sent to the client 
    // jwt.sign({ user: user }, 'secretkey', (err, token) => {
    //     res.json({
    //         token: token
    //     })
    // });
    const payload = { id: user.id, email: user.email, name: user.name }
    const token = jwt.sign(payload, 'secretkey')
    //console.log(token)
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    })

    res.json({
        token: token
    })
}

async function createPost(req, res) {
    

    //I only have one other and need to fix this later
    //How do i cycle between authors and post
    const user = await db.author.findMany();
    console.log(user[0].id) //works
    let id = user[0].id


    const { title, content, published } = req.body
    console.log(title)
    console.log(content)
    console.log(published)
    
    const results = await db.post.create({
        "data": {
        "title": title,
        "content": content,
        "published": published,
        "author": {
            "connect": {
                "id": id,
                }
            }
        }
    })

    console.log(results)
    //console.log(authData)
    res.json({
        message: 'Post created',
        result: results
    }) 
}

async function getSinglePost(req, res) {
    
    
    let postId = req.params.id
    postId = parseInt(postId)
    console.log(postId)

    //I am not Dynamically grabbing the author id for below query
    const user = await db.author.findMany();
    console.log(user)
    console.log(user[0].id) //works
    let authorId = user[0].id

    const singlePost = await db.post.findMany({
        "where": {
            "id": postId,
            "authorId": authorId

        }
    })

    res.json(singlePost)
}
    

async function getAllPost(req, res) {
    // REMEBER to use AWAIT to get the async promise on db queries
    const authorPost = await db.post.findMany()
    console.log(authorPost)

    //I need to send this data to the client with buttons for 
    //Update button and Delete Button & send to linked place
    //Use the create Post as a mock how to grab id as it comes

    res.json(authorPost)
    
}

async function updatePost(req, res) {
    
    //I am not Dynamically grabbing the author id for below query
    const user = await db.author.findMany();
    console.log(user[0].id) //works
    let id = user[0].id


    let { postId } = req.params;

    postId = parseInt(postId);

    const { title, content, published } = req.body;

    try {
    const results = await db.author.update({
        "where": {
            "id": id,
        },
        "data": {
            "post": {
                "update": {
                    "where": {
                        "id": postId,
                    },
                    "data": {
                        "title": title,
                        "content": content,
                        "published": published
                        },
                    },
                },
            },
            "include": {
                "post": true,
            },
        })
        console.log(results)
        res.send(results)
    } catch (error) {
        console.log(error);
    }

}

async function deletePost(req, res) {
    let { postId } = req.params;

     const user = await db.author.findMany();
    console.log(user[0].id) //works
    let id = user[0].id

    postId = parseInt(postId)

    const results = await db.author.update({
        "where": {
            "id": id,
        },
        "data": {
            "post": {
                "delete": {
                    "id": postId,
                },  
            },
        },
        "include": {
            "post": true,
        }
    });
        console.log(results)
        res.send(`The author with id of ${id}, had the post ${postId} has been removed`)

}



module.exports = {
    createPost,
    getSinglePost,
    getAllPost,
    updatePost,
    deletePost,
    loginPost
}