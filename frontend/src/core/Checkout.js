import React, { useState, useEffect } from 'react'
import Layout from "./Layout";
import { getProducts, getBraintreeClientToken, processPayment } from './apiCore'
import Card from './Card'
import { isAuthenticated } from "../auth"
import { Link } from "react-router-dom"
import DropIn from "braintree-web-drop-in-react"

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        addres: ""
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


    const buy = () => {
        // send the nonce to the server
        // nonce = data.instance.requestPaymentMethod
        let nonce = null
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                console.log('Data', data)
                nonce = data.nonce
                // once you hace nonce (card type, card number) send nonce as 'paymentMethodNonoce'
                // and also total to be charged
                // console.log('send nonce and total to process: ', nonce, getTotal(products))

                const paymentData = {
                    paymentMethodNonoce: nonce,
                    amount: getTotal(products)
                }

                processPayment(userId, token, paymentData)
                    .then(response => {
                        setData({...data, success: data.success})
                        // empty card
                        // create order

                    })
                    .catch(err => console.log('err', err))
          })
            .catch(error => {
                // console.log('drop in error: ', error)
                setData({...data, error: error.message})
            })
    }
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
                    <button onClick={buy} className="btn btn-success btn-block">
                        Pay
                    </button>
                </div>
            ) : null}
        </div>
    );

    
    const showSuccess = success => (
        <div 
            className="alert alert-info"
            style={{display: success ? '' : 'none'}}
        >
            Thanks! Your payment was successful!
        </div>
    )

    const showError = error => (
        <div 
            className="alert alert-danger"
            style={{display: error ? '' : 'none'}}
        >
            {error}
        </div>
    )

    return(
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
}

export default Checkout