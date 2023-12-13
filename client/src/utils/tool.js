import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import cookie from 'react-cookies';


export const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
})



export const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
        </div>
    );
};


export const showToast = (type, message) => {
    switch (type) {
        case 'SUCCESS':
            toast.success(message);
            break;
        case 'ERROR':
            toast.error(message);
            break;
        default:
            return null;
    }
};



export const getTokenCookie = () => cookie.load('x-access-token');
export const removeTokenCookie = () => cookie.remove('x-access-token', { path: '/' });
export const getAuthHeader = () => {
    return { headers: { 'Authorization': `Bearer ${getTokenCookie()}` } }
}


export const DashboardTitles = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
        </div>
    )   
}
