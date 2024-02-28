import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation(); //  it's a property that is often included in the state managed by a reducer (provided by redux)

    const {userInfo} = useSelector(state => state.auth);  // extract userInfo object from the Redux store's auth slice

    const {search} = useLocation(); // useLocation hook from React router
    const sp = new URLSearchParams(search);
    const redirect =  sp.get('redirect') || '/' ;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        };

    }, [navigate, redirect, userInfo]); //When any of these dependencies change between renders, the effect will be re-run

    const submitHandler = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
    
        try {
            // Call the 'login' function with the 'email' and 'password' values
            const res = await login({ email, password }).unwrap();
    
            // Log the response to the console
            console.log(res);
    
            // Dispatch an action to set the credentials in the Redux store
            dispatch(setCredentials({ ...res }));
        } catch (error) {
            // If an error occurs during the login attempt:
    
            // Display an error message using the 'toast.error' function
            // If there is a custom error message in the response data, use it; otherwise, use the general error message
            toast.error(error?.data?.message || error.message);
        }
    }
    

    return (
        <div>
            <section className="pl-[10rem] flex flex-wrap">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font-semibold mb-4">SIGN IN</h1>

                    <form onSubmit={submitHandler} className="container w-[40rem]">
                        <div className="my-[2rem]">
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium"
                            >
                                Email Address
                            </label>

                            <input 
                                type="email" 
                                id="email" 
                                className="mt-1 p-2 border rounded w-full" 
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="my-[2rem]">
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium"
                            >
                                Password
                            </label>

                            <input 
                                type="password" 
                                id="password" 
                                className="mt-1 p-2 border rounded w-full" 
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button 
                        disabled={isLoading} //Disabled it if its {isLoading}
                        type="submit"
                        className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer mt-[1rem]"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                    
                    {isLoading && <Loader/>} {/* Loading animation */}
                    </form>

                    <div className="mt-4">
                        <p className="text-black">
                            New Customer ? {" "}
                            <Link to={redirect ? `/register?redirect=${redirect}` : `/register`} // redirect to http://localhost:5173/register?redirect=/
                            className="text-pink-500 hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                    alt=""
                    className="h-[65rem] w-[47%] xl:block md:hidden sm:hidden rounded-lg"
                />

            </section>

        </div>
    );
}; 

export default Login