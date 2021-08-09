import db from "../../../libs/db";
import authorization from '../../../middlewares/authorization';

export default async (req, res) => {
    req.method != 'POST' && res.status(405).end();

    const auth = await authorization(req, res);
    
    const {title, content} = req.body;
    
    const create = await db("posts").insert({
      title, content
    })
  //   const create = await db("posts").insert({
  //   title: "Post title 1",
  //   content: "Post content 1",
  // });

  const createdData = await db("posts").where('id', create).first()

  res.status(200);
  res.json({ 
    message: "Post created successfully",
    data: createdData,
  });
};
