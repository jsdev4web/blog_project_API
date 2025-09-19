
const { result, forEach } = require("lodash")
const db = require("../prismaClient")
const { post, connect } = require("../routes/authorRouter")
const jwt = require("jsonwebtoken")


async function loginPost(req, res){
    let { id } = req.params
    id = parseInt(id)

    const user =  await db.author.findMany({
            "where": {
                "id": id
            }
        })
    console.log(user)
    // send token in the header using CURL or Fetch
    jwt.sign({user: user}, 'secretkey', (err, token) => {
        res.json({
            token: token
        })
            console.log(token)
    });
};

async function createPost(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403)
            } else {
            /* res.json({
                message: 'Post',
                authData
            }) */
            // prisma schema relations database create post existing user Google search
                let { id } = req.params
                id = parseInt(id)
                const { title, content, published } = req.body
                const results = db.post.create({
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
            console.log(authData)
            res.send(results) 
        }
    })
}

async function getPost(req, res) {

    
    let { id } = req.params
    id = parseInt(id)
    let authPost;
    const results = await db.author.findUnique({
        "where": { "id": id },
        "include": {
            "post": true,
        },
    })
    console.log(results)
    results.post.forEach((content) => {
        authPost = content.content
        console.log(content.content)
    })

    console.log(results.name)
    res.send(`${authPost} written by ${results.name}`)
};

async function updatePost(req, res) {

    let { id, postId } = req.params;

    id = parseInt(id);
    postId = parseInt(postId);

    const { title, content } = req.body;

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
    let { id, postId } = req.params;

    id = parseInt(id)
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
    getPost,
    updatePost,
    deletePost,
    loginPost,
}