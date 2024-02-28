import {Navigate, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';


const AdminRoute = () => {
    const {userInfo} = useSelector(state => state.auth) //extract userInfo object from the Redux store's auth slice

    return userInfo && userInfo.isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to='/login' replace/>
    )
}

export default AdminRoute