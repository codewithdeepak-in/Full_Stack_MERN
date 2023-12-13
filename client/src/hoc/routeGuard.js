import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const RouteGuard = (props) => {
    const users = useSelector(state => state.users);    
    if(!users.auth){
       return <Navigate to="/auth" />
    }

    return props.children
}

export default RouteGuard;
