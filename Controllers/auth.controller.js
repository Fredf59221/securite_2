import usersModel from '../Models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function register(req, res) {
     try {
    const body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    const inserted = await usersModel.insert(body);
    res.status(201).json(inserted);
   
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Une erreur est survenue lors de l'inscription" });
    }
}
async function login(req, res) {
    try {
        // Récupérer le login et le mot de passe recu
        const body = req.body;
        if(!body.login || !body.password){
           return res.status(403).json({error : "Identifiant incorrect"})
        }
        // Vérifier que le login recu correspond a un user en bdd
        const user = await usersModel.getByLogin(body.login);
        if(!user){
            return res.status(403).json({error : "Identifiant incorrect"})
        }
        // Comparer le mot de passe recu avec celui en bdd
        const compare = bcrypt.compareSync(body.password, user.us_password);
        if (compare == false){
            return res.status(403).json({error : "Identifiant incorrect"})
        }
        // Générer un token JWT
        const token = jwt.sign({
           id: user.us_id, username: user.us_username, email: user.us_email
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.json(token);
}  catch (error) {
    console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la connexion" })
    }
}

export default {
    register,
    login
}