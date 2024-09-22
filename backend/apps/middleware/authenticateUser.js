const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(400).json({ error: "token is required" });
  }
  try {
    const tokendata = jwt.verify(token, process.env.SECRET_KEY);
   
    req.user = {
      id: tokendata.id,
     
    };
    next()
   
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = authenticateUser;