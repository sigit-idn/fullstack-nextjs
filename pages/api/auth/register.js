import db from '../../../libs/db';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
    req.method != 'POST' && res.status(405).end();

    res.status(200);
    const {email, password} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt)

    const register = await db('users').insert({email, password: passwordHash});
    const registeredUser = await db('users').where({id: register}).first();

    res.json({
        "message"   : "Account register successfully",
        "data"      : registeredUser
    })
}