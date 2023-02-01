import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterProductCategoryThunk, filterSearchProduct, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch()
    const productsList = useSelector(state => state.products)
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [searchProduct, setSearchProduct] = useState("")

    useEffect(() => {
        dispatch(getProductsThunk())
        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
        .then(res => setCategories(res.data))
    }, [])

    console.log(productsList)

    return (
        <div>
            <h1>Home</h1>
            <div className='home'>
                <article>
                    {categories.map( category => (
                        <button onClick={() => dispatch(filterProductCategoryThunk(category.id))} key={category.id}>{category.name}</button>
                    ))}
                    <input  type="text" 
                            value={searchProduct}
                            onChange={e => setSearchProduct(e.target.value)}
                            id='search'/>
                    <button onClick={() => dispatch(filterSearchProduct(searchProduct))}>O.O</button>
                </article>
                <ul className='products-list'>
                    {productsList.map(product => (
                        <li key={product.id}
                            onClick={()=> navigate(`/products/${product.id}`)}>
                            <h3>
                                {product.title}
                            </h3>
                            <br />
                            <div className='product-images'>
                                <div className='hover-image'>
                                    <img src={product.images?.[0].url} alt="" />
                                </div>
                                <img className='base-image' src={product.images?.[1].url} alt="" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;