import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Header from './components/navigation/header';
import About from './components/about';
import MainLayout from './hoc/mainlayout';
import Auth from './components/auth';
import Dashboard from './components/dashboard';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth } from './store/actions/users';
import {Loader} from './utils/tool';
import RouteGuard from './hoc/routeGuard';
import AdminProfile from './components/dashboard/profile';
import AdminArticles from './components/dashboard/articles';
import MainDashboard from './components/dashboard/main';
import AddArticle from './components/dashboard/articles/add_edit';


const Router = () => {

    const user = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(isAuth());
    }, [])

    useEffect(() => {
        if (user.auth !== null) {
            setLoading(false)
        }
    })
    return (
        <BrowserRouter>
            {loading ? <Loader /> :
                <>
                    <Header />
                    <MainLayout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/dashboard" element={<RouteGuard><Dashboard /></RouteGuard>} >
                                <Route index element={<MainDashboard/>} />
                                <Route path="profile" element={<AdminProfile />} />
                                <Route path="articles/add" element={<AddArticle />} />    
                                <Route path="articles" element={<AdminArticles />} />
                            </Route>
                        </Routes>
                    </MainLayout>
                </>
            }
        </BrowserRouter>
    )
}

export default Router;
