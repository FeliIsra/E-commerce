import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const { categories, category, search, results, searched } = data

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => {
        getCategories()
            .then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    setData({...data, categories: data})
                }
            })
    }

    const handleChange = name => e => {
        setData({...data, [name]: e.target.value, searched: false})
    }

    const searchData = () => {
        if(search){
            list({search: search || undefined, category: category})
                .then(res => {
                    if(res.error){
                        console.log(res.error)
                    } else {
                        setData({...data, results: res, searched: true})
                    }
                })
        }
    }

    const searchSubmit = e => {
        e.preventDefault()
        searchData()
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className={'btn mr-2'} onChange={handleChange('category')}>
                            <option value="ALL">All</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className={'form-control'}
                        onChange={handleChange('search')}
                        placeholder='Search by name'
                    />
                </div>
                <div className="btn input-group-append" style={{border: 'none'}}>
                    <button className="input-group-text">
                        Search
                    </button>
                </div>
            </span>
        </form>
    )

    const searchMessage = (searched, resuslts) => {
        if(searched && resuslts.length > 0){
            return `Found ${ resuslts.length } products`
        }

        if(searched && resuslts.length < 1){
            return `No products found`
        }
    }

    const searchedProducts = (results = []) => (
        <div>
            <h2 className={'mt-4 mb-4'}>
                {searchMessage(searched, results)}
            </h2>
            <div className={'row'}>
                {results.map((product, i) => (
                    <Card product={product} key={i} />
                ))}
            </div>
        </div>
    )

    return (
        <div className={"row"}>
            <div className="container mb-3">
                {searchForm()}
            </div>
            <div className="container-fluid">
                {searchedProducts(results)}
            </div>
        </div>
    )
}

export default  Search