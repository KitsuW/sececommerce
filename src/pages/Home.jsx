import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch()
    const productsList = useSelector(state => state.products)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <div className='home'>
                <article>
                    Searchbar
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