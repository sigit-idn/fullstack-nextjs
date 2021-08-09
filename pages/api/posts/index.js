import db from "../../../libs/db";
import authorization from "../../../middlewares/authorization";
export default async (req, res) => {
  req.method != "GET" && res.status(405).end();

  const auth = await authorization(req, res);

  const posts = await db("posts");

  res.status(200);
  res.json({
    message: "Post data.",
    data: posts,
  });
};
