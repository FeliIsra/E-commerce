import React, { useState, useEffect } from 'react'
import Layout from "./Layout";
import Card from './Card'
import { getCategories } from './apiCore'
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
    }, [])


	const handleFilters = (filters, filterBy) => {
		// console.log('SHOP',filters, filterBy)
		const newFilters = {...myFilters}
		newFilters.filters[filterBy] = filters
		setMyFilters(newFilters)
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
					{JSON.stringify(myFilters)}
				</div>
			</div>
		</Layout>
	)
}

export default Shop