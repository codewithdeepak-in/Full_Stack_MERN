import { Box } from '@mui/material';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = (props) => {
    return(
        <Box className={`main_layout`}>
            {props.children}
            <ToastContainer />
        </Box>
    )
}

export default MainLayout;
