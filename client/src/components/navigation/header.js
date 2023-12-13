import { Link } from "react-router-dom";
import SimpleDrawer from "./sidedrawer";
import { useEffect } from "react";
import { clearNotification } from "../../store/reducers/notifications";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../utils/tool";
import { signOut } from "../../store/actions/users";

const Header = () => {

    const users = useSelector((state) => state.users);
    const notification = useSelector((state) => state.notification.global);
    const dispatch = useDispatch();

    useEffect(() => {
        if(notification && notification.error){
            showToast("ERROR", notification.message);
            dispatch(clearNotification());
        }
        if(notification && notification.success){
            showToast("SUCCESS", notification.message);
            dispatch(clearNotification());
        }
    }, [notification])

    function signOutUser(){
        dispatch(signOut());
    }

    return (
        <nav className="navbar navbar-expand-lg p-3 navbar-light bg-light d-flex justify-content-between">
            <Link to="/" className="navbar-brand">FlickBase</Link>
            <SimpleDrawer users={users} Signout={signOutUser}/>
        </nav>
    )
}


export default Header;