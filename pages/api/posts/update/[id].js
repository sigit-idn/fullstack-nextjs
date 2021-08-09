import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

export default async (req, res) => {
    req.method != 'PUT' && res.status(405).end();
    const {id} = req.query;
    res.status(200);

    const auth = await authorization(req, res);
    const {title, content} = req.body;

    const update        = await db("posts").where({ id }).update({ title, content})
    const updatedData   = await db("posts").where({ id }).first()

    res.json({
        "message"   : "Post update successfully",
        "data"      : updatedData
    })
}