import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const err = new Error("Not authenticated");
      err.statusCode = 401;
      throw err;
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(token, "hehe");
    if (!decodedToken) {
      const err = new Error("Not authenticated.");
      err.statusCode = 401;
      throw err;
    }

    req.userId = decodedToken.userid;
  } catch (error) {
    next(error);
  }

  next();
};

export default isAuth;
