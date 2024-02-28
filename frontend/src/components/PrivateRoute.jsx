import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";


const PrivateRoute = () => {
    // extracting some piece of data
    const {userInfo} = useSelector(state => state.auth); // same with const userInfo = useSelector(state => state.auth.userInfo);

    return userInfo ? <Outlet /> : <Navigate to="/login" replace/>;
};

export default PrivateRoute;