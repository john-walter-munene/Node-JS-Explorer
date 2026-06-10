const protectRoute = (req, res, next) => {
  if (req.user) {
    return next();
  }

  return res.status(401).json({ error: 'Login required' });
};

module.exports = protectRoute;