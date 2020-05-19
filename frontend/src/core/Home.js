import React, { useState, useEffect } from 'react'
import Layout from "./Layout";
import { getProducts } from './apiCore'
import Card from './Card'
import Search from "./Search";

function Home(){

	const [productsBySell, setProductsBySell] = useState([])
	const [productsByArrival, setProductsByArrival] = useState([])
	const [error, setError] = useState(false)


    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

	useEffect(() => {
		loadProductsBySell()
		loadProductsByArrival()
	}, [])

    return(
        <Layout 
        	title='Home Page' 
        	description='Node React E-commerce App' 
        	className='container-fluid'
        >
            <Search />
			<h2 className='mb-4'>New arrival</h2>
			<div className="row">
				{productsByArrival.map((p,i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card  product={p} />
                    </div>
				))}
			</div>


			<h2 className='mb-4'>Best sellers</h2>
			<div className="row">
				{productsBySell.map((p,i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card  product={p} />
                    </div>
				))}
			</div>
        </Layout>
    )
}

export default  Home;