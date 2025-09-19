const db = require("../prismaClient")

async function createComment(req, res) {

    let { id } = req.params
    id = parseInt(id)

    let { userid } = req.params
    userid = parseInt(userid)

    const { comment } = req.body

    const results = await db.comment.create({
        data: {
            "comment": comment,
            "post": { "connect": {
                "id": id
            }},
            "user": { "connect": {
                "id": userid
            }},
        }
    })

    res.send(results)
        
}

async function getComment(req, res) {
    let results;

    let { id } = req.params;
    id = parseInt(id)

    const { name } = req.body;
    
   
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
    updateComment,
    deleteComment,
}