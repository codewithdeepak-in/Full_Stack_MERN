const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');
const auth = require('../middleware/auth');

router.post('/', auth('createAny', 'articles'), articleController.createArticle) // action , resource


router.get('/article/:id', auth('readAny', 'articles'), articleController.readArticleById)
router.patch('/article/:id', auth('updateAny', 'articles'), articleController.updateArticleById)
router.delete('/article/:id', auth('deleteAny', 'articles'), articleController.deleteArticleById);
router.get('/all', articleController.findAllArticles);
router.get('/users/article/:id', articleController.findPublicArticles);

module.exports = router;
