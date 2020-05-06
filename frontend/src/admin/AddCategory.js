import React, { useState } from 'react'
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

function  AddCategory() {
    const [name, setName] = useState('')
    const [error, setError] =  useState(false)
    const[success, setSuccess] = useState(false)

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated()

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)

    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        // make request to API to create category
    }

    const newCategoryForm = () => {
        return(
            <form onSubmit={clickSubmit}>
                <div className={'form-group'}>
                    <label className={'text-muted'}>Name</label>
                    <input type={'text'} className={'form-control'} onChange={handleChange} value={name} autoFocus/>
                </div>
                <button className={'btn btn-outline-primary'}>Create category</button>
            </form>
        )
    }

    return(
        <Layout title={'Add a new Category'} description={`G'dat ${name}, ready to create a new category?`}  >
            <div className={'row'}>
                <div className={'col-md-8 offset-md-2'}>
                    {newCategoryForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory