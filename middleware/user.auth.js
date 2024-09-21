const auth = (req, res, next) => {
  try {
    let token = req.headers.Authorization;
    if (!token) {
      return res.status(400).send("Token not found");
    }
    let decoded = jwt.verify(token, "secretkey");
    if (!decoded) {
      return res.status(400).send("Invalid token");
    }
    req.body.email = decoded.email;
    req.body.role = decoded.role;
    next();
  } catch (error) {
    console.log(error);
  }
};
