import React, { useState, useEffect } from 'react'
import Layout from "./Layout";
import { getProducts } from './apiCore'
import Card from './Card'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    return(
        <div>
            {JSON.stringify(products)}
        </div>
    )
}

export default Checkout