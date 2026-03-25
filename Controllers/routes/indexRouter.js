const { Router } = require('express');
const indexRouter = Router();

indexRouter.get("/", (request, response) => {
    response.send("This is the home page...Keep coding Walter");
})

module.exports = indexRouter;