import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoutes";
import AdminRoutes from './auth/AdminRoutes';
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from './core/Shop'
import Product from './core/Product'

function  Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path='/shop' exact component={Shop}/>
                <Route path='/product/:productId' exact component={Product}/>
                <PrivateRoute path='/user/dashboard' exact component={UserDashboard}/>
                <AdminRoutes path='/admin/dashboard' exact component={AdminDashboard}/>
                <AdminRoutes path='/create/category' exact component={AddCategory}/>
                <AdminRoutes path='/create/product' exact component={AddProduct}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes