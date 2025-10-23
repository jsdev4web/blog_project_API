const db = require("../prismaClient")
const { connect } = require("../routes/authorRouter")

async function createComment(req, res) {

    //post id number
    let { userid } = req.params
    userid = parseInt(userid)

    console.log(userid, "userid is suppose to be for Tom ")
    //user id number here
    let { postid } = req.params
    postid = parseInt(postid)
    console.log(postid, "post id of 2")

    const { comment } = req.body

    const results = await db.comment.create({
        data: {
            "comment": comment,
            user: {
                connect: {
                    "id": userid
                }
            },
            post: {
                connect: {
                    "id": postid
                }
            }
        }
    })

    res.send(results)
        
}

async function getAllComment(req, res) {
    let results

    results = await db.comment.findMany()
    res.send(results)
}

async function getComment(req, res) {
    let results;

    //post id numbers
    let { id } = req.params;
    id = parseInt(id)    
   
    results = await db.user.findMany({
        "include": {
            "comments": {
                "where": {
                    "id": id,
                }
            }
        }
    })

    
    console.log(results)
    res.send(results)


}

async function getPostIdComment(req, res){
    let results;

    let postId = req.params.postid
    postId = parseInt(postId)
    console.log(postId, "post id works")

    results = await db.comment.findMany({

        "where": {
            "postId": postId,
        },
        "include": {
            "user": {
                "select": {
                    "name": true,
                }
            }
        }
    })

    
    console.log(results)
    res.json(results)


}

async function updateComment(req, res) {

    let { id } = req.params;
    id = parseInt(id);

    let { userid } = req.params;
    userid = parseInt(userid);

    const { comment } = req.body;

    const results = await db.comment.update({
        "where": { "id": id },
        "data": { "comment": comment,
        "user": { "connect": { "id": userid }} 
        }
        })
        res.send(results)
    }

async function deleteComment(req, res) {

    let { id } = req.params;
    id = parseInt(id);

    let { userid } = req.params;
    userid = parseInt(userid);

    const results = await db.comment.deleteMany({
       "where": { "id": id,
       }
        }
    
)
 res.send(`I deleted the comment with id: ${{id}}`)   
}

module.exports = {
    createComment,
    getComment,
    getAllComment,
    getPostIdComment,
    updateComment,
    deleteComment,
}




/* results = await db.comment.findMany({
        "include": {
            "comment": {
                "where": {
                    "postId": id,
                }
            }
        }
    }) */