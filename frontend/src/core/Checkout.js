import React, { useState, useEffect } from 'react'
import Layout from "./Layout";
import { getProducts, getBraintreeClientToken } from './apiCore'
import Card from './Card'
import { isAuthenticated } from "../auth"
import { Link } from "react-router-dom"
import DropIn from "braintree-web-drop-in-react"

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        addres: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setData({ ...data, error: data.error });
                } else {
                    console.log(data);
                    setData({ clientToken: data.clientToken });
                }
            });
    };

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((currenValue, nextValue) => {
            return currenValue + nextValue.count * nextValue.price  
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />

                    <button  className="btn btn-success">
                        Checkout
                    </button>
                
                </div>
            ) : null}
        </div>
    );

    
    return(
        <div>
            <h2>Total: ${getTotal()}</h2>
        
            {showCheckout()}
        </div>
    )
}

export default Checkout