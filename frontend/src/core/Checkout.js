import React, { useState, useEffect } from 'react'
import Layout from "./Layout";
import { getProducts } from './apiCore'
import Card from './Card'
import { isAuthenticated } from "../auth"
import { Link } from "react-router-dom"

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    
    const getTotal = () => {
        return products.reduce((currenValue, nextValue) => {
            return currenValue + nextValue.count * nextValue.price  
        }, 0)
    }

    const showCheckOut = () => {
        
        return isAuthenticated() ? (
            <button className="btn btn-success">Checkout</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        )
    }
    
    return(
        <div>
            <h2>Total: ${getTotal()}</h2>
        
            {showCheckOut()}
        </div>
    )
}

export default Checkout