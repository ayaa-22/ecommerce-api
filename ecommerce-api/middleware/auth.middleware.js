import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Auth Required,Plz Login first",
      });
    }

    let token = authHeader.split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.SECRET);
    req.userId = decodedToken.userId;
    console.log(decodedToken);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired Token!" });
  }
};

export default auth;
