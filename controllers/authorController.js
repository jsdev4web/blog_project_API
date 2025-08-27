
const db = require("../lib/prisma")

async function createAuthor(req, res) {
    const { name, email } = req.body
    console.log(name, email)
    const result = await db.prisma.author.create({
        data: {
            "name": name,
            "email": email,
        }
    })
    console.log(result)
}

async function getAuthor(req, res) {
    //right now this gets all authors
    const result = await db.prisma.author.findMany()
    
   //console.log(result)
   res.send(result)
};  

async function updateAuthor(req, res) {
    const { name, email } = req.body;
    let { id } = req.params;
    id = parseInt(id)
    const result = await db.prisma.author.update({
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
   const result = await db.prisma.author.delete({
    where: {
        id: id
      },
   });
   console.log(id)
}; 



module.exports = {
    createAuthor,
    getAuthor,
    updateAuthor,
    deleteAuthor,
}