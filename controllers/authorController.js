
const db = require("../prismaClient")
 

async function createAuthor(req, res) {
    
    const { name, email } = req.body
    console.log(name, email)
    const result = await db.author.create({
        data: {
            "name": name,
            "email": email,
        }
    })
    console.log(result)
    res.send(result)
}

async function getAuthor(req, res) {
    //right now this gets all authors
    const result = await db.author.findMany()
    
   //console.log(result)
   res.send(result)
};  

async function updateAuthor(req, res) {
    const { name, email } = req.body;
    let { id } = req.params;
    id = parseInt(id)
    const result = await db.author.update({
        where: {
            "id": id
        },
        data: {
            "name": name,
            "email": email,
        }
    })
    console.log(id)
    
}

async function deleteAuthor(req, res) {
    let { id } = req.params;
    id = parseInt(id)
   const result = await db.author.delete({
    where: {
        id: id
      },
   });
   console.log(id)
   res.send(`The user with id:${id} is deleted.`)
}; 





module.exports = {
    createAuthor,
    getAuthor,
    updateAuthor,
    deleteAuthor,
    
}