
const db = require("../lib/prisma")

async function createUser(req, res) {
    const { name, email } = req.body;
    const result = await db.prisma.user.create({
        data: {
            "name": name,
            "email": email,
        }
        
    })
    res.send(result)
    console.log(result)
}

async function getUser(req, res) {
    const result = await db.prisma.user.findMany()
    res.send(result)
};

async function updateUser(req, res) {
    let { id } = req.params
    id = parseInt(id)
    console.log(id)

    const { myName, email } = req.body;
    const result = await db.prisma.user.update({
        where: {
            "id": id
        },
        data: {
            "name": myName, //remember to make the request myName
            "email": email,
        }
    })

    console.log(result)

}

async function deleteUser(req, res) {
    const { id } = req.params
    console.log(id)

    const result = db.prisma.user.delete({
        where: {
            id: id
          },
       });
       console.log(id + result + " has been removed")
}


module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
}