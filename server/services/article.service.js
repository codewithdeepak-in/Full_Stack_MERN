const { Article } = require('../modals/article');
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apierror');




const addArticle = async (body) => {
    try {
        const article = new Article({
            ...body,
            score: parseInt(body.score)
        })
        await article.save();
        return article;
    } catch (error) {
        throw error
    }
}
const findArticle = async (req, user) => {
    try {
        const _id = req.params.id;
        const article = await Article.findById(_id);
        if(!article){
            throw new ApiError(httpStatus.NOT_FOUND, 'Article Not Found');
        }
        if (user.role === 'user' && article.status === 'draft'){
            throw new ApiError(httpStatus.NOT_FOUND, "You Don't have enough Rights");
        }
        console.log(article);
        return article;
    } catch (error) {
        throw error
    }
}
const findArticles = async (req) => {
    try {
        const _id = req.params.id;
        const article = await Article.findById(_id);
        if(!article){
            throw new ApiError(httpStatus.NOT_FOUND, 'Article Not Found');
        }
        if (article.status === 'draft'){
            throw new ApiError(httpStatus.NOT_FOUND, "You Don't have enough Rights");
        }
        console.log(article);
        return article;
    } catch (error) {
        throw error
    }
}

const findArticleAndUpdate = async(req) => {
    try{    
        const _id = req.params.id;
        const article = await Article.findByIdAndUpdate(_id, { $set: req.body }, { new: true });
        if(!article){
            throw new Error(httpStatus.NOT_FOUND, 'Article Not Found');
        }
        return article;
    }catch(error){
        throw error
    }
}

const deleteArticle = async(req) => {
    try{
        const _id = req.params.id;
        const article = await Article.findByIdAndDelete(_id);
        if(!article){
            throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
        }
        return article;
    }catch(error){
        throw(error);
    }
}
const findAllArticleService = async (req) => {
    console.log('working');
    const sort = req.query.sortby || "_id";
    const order = req.query.order || "desc";
    const limit = req.query.limit ? parseInt(req.query.limit) : 5; // Parsing limit as an integer

    try {
        const sortCriteria = {};
        sortCriteria[sort] = order === 'desc' ? -1 : 1;

        const articles = await Article.find({ status: 'public' })
            .sort(sortCriteria)
            .limit(limit);

        return articles;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addArticle,
    findArticle,
    findArticles,
    findArticleAndUpdate,
    deleteArticle,
    findAllArticleService
    
}