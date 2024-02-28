import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';

//PrivateRoute
import PrivateRoute from './components/PrivateRoute.jsx';


//Auth
import Login from "./pages/Auth/Login.jsx";
import Register from './pages/Auth/Register.jsx';

import Profile from './pages/User/Profile.jsx';

import AdminRoute from './pages/Admin/AdminRoute.jsx';
import UserList from './pages/Admin/UserList.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import ProductList from './pages/Admin/ProductList.jsx';
import AllProducts from './pages/Admin/AllProducts.jsx';
import ProductUpdate from './pages/Admin/ProductUpdate.jsx';
import Home from './Home.jsx';
import Favourites from './pages/Products/Favourites.jsx';
import ProductDetails from './pages/Products/ProductDetails.jsx';
import Cart from './Cart.jsx';
import Shop from './pages/Shop.jsx';
import Shipping from './pages/Order/Shipping.jsx';
import PlaceOrder from './pages/Order/PlaceOrder.jsx';
import Order from './pages/Order/Order.jsx';
import UserOrder from './pages/User/UserOrder.jsx';
import OrderList from './pages/Admin/OrderList.jsx';
import AdminDashboad from './pages/Admin/AdminDashboad.jsx';

import {PayPalScriptProvider} from '@paypal/react-paypal-js';

// This line creates a router instance using the configuration defined by the route element.
const router = createBrowserRouter(
    createRoutesFromElements(
        // When the path is "/", the App component should be rendered.
        // This uses nested routes approach, but also can use top-level routes approach
        <Route path='/' element={<App />}>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route index={true} path='/' element={<Home />}/> {/*Render at the parents level route by using index route, like instead of "https://localhost:5000/home/product" --> "https://localhost:5000/product"*/}
            <Route path='/favourite' element={<Favourites />}/>
            <Route path='/product/:id' element={<ProductDetails />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/shop' element={<Shop />}/>
            <Route path='/user-orders' element={<UserOrder />}/>
            
            

            <Route path='' element={<PrivateRoute />}>
                <Route path='/profile' element={<Profile />}/>
                <Route path='/shipping' element={<Shipping />}/>
                <Route path='/placeorder' element={<PlaceOrder />}/>
                <Route path='/order/:id' element={<Order />}/>
            </Route>

            {/* Admin Routes */}
            <Route path='/admin' element={<AdminRoute />}>
                <Route path='userlist' element={<UserList />} />
                <Route path='categorylist' element={<CategoryList />} />
                <Route path='productlist' element={<ProductList />} />
                <Route path='allproductslist' element={<AllProducts />} />
                <Route path='orderlist' element={<OrderList />} />
                <Route path='product/update/:_id' element={<ProductUpdate />} />
                <Route path='dashboard' element={<AdminDashboad />} />
            </Route>
           
            
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    // Redux store is available to the components within the Provider hierarchy.
    <Provider store={store}>
        <PayPalScriptProvider>
    {/*  It creates a router, defines a route for the root path, and then renders the application with the router made available to all components through <RouterProvider>. */}
            <RouterProvider router={router} />
        </PayPalScriptProvider>
    </Provider>
)
