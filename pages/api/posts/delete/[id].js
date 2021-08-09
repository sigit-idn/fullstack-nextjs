import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

export default async (req, res) => {
    req.method != 'DELETE' && res.status(405).end();
    
    const auth = await authorization(req, res);
    const {id} = req.query;
    const deletePost = await db("posts").where({id}).delete();
    
    res.status(200);
    res.json({
        "message"   : "Post deleted successfully",
    })
}