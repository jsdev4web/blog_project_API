
const db = require("../prismaClient")

async function createUser(req, res) {
    const { name, email } = req.body;
    console.log(name)
    console.log(email)
    const result = await db.user.create({
        data: {
            "name": name,
            "email": email,
        }
        
    })
    res.send(result)
    console.log(result)
}

async function getUser(req, res) {
    const result = await db.user.findMany()
    res.send(result)
};

async function getByUser(req, res) {
    let { name } = req.body
    const result = await db.user.findMany({
        where: {
            "name": name   
        }
    })
    res.send(result)
};

async function updateUser(req, res) {
    let { id } = req.params
    id = parseInt(id)
    console.log(id)

    const { myName, email } = req.body;
    const result = await db.user.update({
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
    let { id } = req.params
    console.log(id)
    id = parseInt(id)

    const result = db.user.delete({
        where: {
            id: id
          },
       });
       console.log(id + result + " has been removed")
}


module.exports = {
    createUser,
    getUser,
    getByUser,
    updateUser,
    deleteUser,
}