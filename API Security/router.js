const { Router } = require("express");

const profileRouter = Router();

profileRouter.get('/profile', auth, (req, res) => {
  res.json(req.user);
});

module.exports = profileRouter;