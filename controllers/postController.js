
const db = require("../lib/prisma")

async function createPost(req, res) {
    // prisma schema relations database create post existing user Google search
    const { id } = req.params
    const { title, content } = req.body

}

async function getPost(req, res) {
    
};

async function updatePost(req, res) {

}

async function deletePost(req, res) {

}


module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost,
}