const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Login required'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      }
    });

    if (!user) {
      return res.status(401).json({
        error: 'User not found'
      });
    }

    // attach user to request
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
};

module.exports = auth;