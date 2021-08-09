import jwt from "jsonwebtoken";

export default async (req, res) => 
 new Promise ((resolve, reject) => {
  const { authorization } = req.headers;

  !authorization && res.status(401).end();

  const authSplit = authorization.split(" ");
  const [authType, authToken] = [authSplit[0], authSplit[1]];

  authType != "Bearer" && res.status(401).end();

  return jwt.verify(authToken, process.env.ACCESS_TOKEN, (err, decoded) => err ? res.status(401).end() : resolve(decoded));
     } )
