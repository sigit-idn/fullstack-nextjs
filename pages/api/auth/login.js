import db from '../../../libs/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
    req.method != 'POST' && res.status(405).end();

    const {email, password} = req.body;
    const checkUser = await db('users').where({email}).first();
    !checkUser && res.status(401).end();
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    
    !checkPassword && res.status(401).end();

    const token = jwt.sign({
        id: checkUser.id,
        email: checkUser.email
    }, process.env.ACCESS_TOKEN, {expiresIn: '60d'})
    
    res.status(200);
    res.json({
        "message"   : "Login successfully",
        token
    })
}