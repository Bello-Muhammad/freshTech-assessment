const jwt = require("jsonwebtoken");
const User = require("../domains/user/models/user.model");

const protectUser = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '')
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { _id } = decoded;
      const user = await User.findOne({ _id })

      if (!user) {
          throw new Error('user not found')
      }

      req.user = user;

      next()
  } catch (e) {
      return res.status(401).json({ responseMessage: 'Please authenticate.' })
  }
};

module.exports = protectUser;