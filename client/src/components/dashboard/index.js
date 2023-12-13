import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AdminLayout from "../../hoc/adminLayout";


const Dashboard = () => {
    return(
        <Box sx={{margin: '0px !important'}}>
            <AdminLayout>
                <Outlet />
            </AdminLayout>
        </Box>
    )
}


export default Dashboard;