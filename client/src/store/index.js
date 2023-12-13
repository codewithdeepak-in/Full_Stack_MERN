import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './reducers/users';
import ArticleReducer from './reducers/articles';
import NotificationReducer from './reducers/notifications';
import SiteReducer from './reducers/site';


const store = configureStore({
    reducer : {
        users: UserReducer,
        articles: ArticleReducer,
        notification: NotificationReducer,
        site: SiteReducer
    }
}) 


export default store;