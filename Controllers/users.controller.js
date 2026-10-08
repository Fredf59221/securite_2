import UsersModel from '../Models/users.model.js'

async function getAll(req,res) {
    try {
        const users = await UsersModel.getAll();
        res.json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Une erreur est survenue lors de la récupération des users"})
    }
}
export default {
    getAll
}