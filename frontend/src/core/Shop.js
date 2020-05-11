import React, { useState, useEffect } from 'react'
import Layout from "./Layout";
import Card from './Card'
import { getCategories, getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import { prices } from './fixedPrices'
import Radiobox from "./Radiobox";

function Shop() {

	const [myFilters, setMyFilters] = useState({
		filters: {
			category: [],
			price: []
		}
	})
	const [categories, setCategories] = useState([])
	const [error, setError] = useState(false)
	const [limit, setLimit] = useState(6)
	const [skip, setSkip] = useState(0)
	const [filteredResults, setFilteredResults] = useState([])


    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
		init()
		loadFilteredResult(skip, limit, myFilters.filters)
    }, [])

	const loadFilteredResult = (newFilters) => {
		// console.log(newFilters)
		getFilteredProducts(skip, limit, newFilters)
			.then(data => {
				if(data.error){
					setError(data.error)
				} else {
					setFilteredResults(data.data)
				}
			})
	}

	const handleFilters = (filters, filterBy) => {
		// console.log('SHOP',filters, filterBy)
		const newFilters = {...myFilters}
		newFilters.filters[filterBy] = filters

		if(filterBy === 'price'){
			newFilters.filters[filterBy] = handlePrice(filters)
		}

		loadFilteredResult(myFilters.filters)
		setMyFilters(newFilters)
	}

	const handlePrice = value => {
		const data = prices
		let array = []

		for(let key in data) {
			if(data[key]._id === parseInt(value)){
				array = data[key].array
			}
		}

		return array
	}

	return(
		<Layout
			title="Shop Page"
			description="Search and find books of your choice"
			className='content-fluid'
		>
			<div className="row">
				<div className="col-4">
					<h4>Filter by categories</h4>
					<ul>
						<Checkbox
							categories={categories}
							handleFilters={filters => handleFilters(filters, 'category')}
						/>
					</ul>

					<h4>Filter by price range</h4>
					<div>
						<Radiobox
							prices={prices}
							handleFilters={filters => handleFilters(filters, 'price')}
						/>
					</div>
				</div>
				<div className="col-8">
					<h2 className="mb-4">Products</h2>
					<div className="row">
						{filteredResults.map((p, i) => (
							<Card key={i} product={p} />
						))}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Shop