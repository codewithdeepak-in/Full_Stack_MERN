const { articlesService } = require("../services");

const articleController = {
    async createArticle(req, res, next){
        try{
            const article = await articlesService.addArticle(req.body);
            res.json(article);
        }catch(error){
            next(error);
        }
    },
    async readArticleById(req, res, next){
        try{
            const article = await articlesService.findArticle(req, req.user);
            return res.json(article);
        }catch(error){
            next(error);
        }
    },
    async findPublicArticles(req, res, next){
        try{
            const article = await articlesService.findArticles(req);
            return res.json(article);
        }catch(error){
            next(error)
        }
    },
    async updateArticleById(req, res, next){
        try{
            const article = await articlesService.findArticleAndUpdate(req);
            return res.json(article);
        }catch(error){
            next(error)
        }
    },
    async deleteArticleById(req, res, next){
        try{
            const article = await articlesService.deleteArticle(req);
            return res.json(article);
        }catch(error){
            next(error);
        }
    },
    async findAllArticles(req, res, next){
        try{
            console.log('working');
            const allArticles = await articlesService.findAllArticleService(req);
            return res.json(allArticles);
        }catch(error){
            next(error);
        }
    }

}

module.exports = articleController;