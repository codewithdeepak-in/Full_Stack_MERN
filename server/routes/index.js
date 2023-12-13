const express = require('express');
const router = express.Router();
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const articleRoute = require('./article.route');

const routesIndex = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/users',
        route: userRoute
    },
    {
        path: '/articles',
        route: articleRoute
    }
]

routesIndex.forEach((item) => router.use(item.path, item.route))


module.exports = router;